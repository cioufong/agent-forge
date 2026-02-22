// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AFGToken.sol";
import "./AgentNFA.sol";
import "./ProblemManager.sol";

/**
 * @title VerifierElection
 * @notice Decentralized verifier system for AgentForge
 *
 *   Verifier eligibility: NFA Level ≥ MIN_VERIFIER_LEVEL + stake MIN_STAKE AFG
 *   Election: random 5 non-participant NFAs per problem
 *   Voting: commit-reveal, 3/5 consensus
 *   Rewards: 8% of tier pool to honest verifiers
 *   Slash: 10% of stake for dishonest votes
 *   Oracle fallback: if < 3 verifiers vote, oracle resolves
 */
contract VerifierElection is Ownable, Pausable, ReentrancyGuard {

    // ============ Constants ============

    uint8 public constant MIN_VERIFIER_LEVEL = 5;
    uint256 public constant MIN_STAKE = 10_000 ether; // 10,000 AFG
    uint256 public constant VERIFIER_COUNT = 5;
    uint256 public constant CONSENSUS_THRESHOLD = 3; // 3/5
    uint256 public constant SLASH_BPS = 1000; // 10% of stake

    // ============ Structs ============

    struct VerifierInfo {
        uint256 tokenId;
        uint256 stakedAmount;
        bool active;
    }

    struct VerifierVote {
        bytes32 commitHash;  // keccak256(answerHash, salt)
        bytes32 revealedAnswer;
        bool committed;
        bool revealed;
    }

    struct ProblemVerification {
        uint256[] electedVerifiers; // tokenIds
        mapping(uint256 => VerifierVote) votes; // tokenId => vote
        uint256 revealCount;
        bool resolved;
    }

    // ============ State ============

    AFGToken public immutable afgToken;
    AgentNFA public immutable agentNFA;
    ProblemManager public problemManager;

    /// @notice tokenId => verifier info
    mapping(uint256 => VerifierInfo) public verifiers;
    /// @notice All staked verifier tokenIds (for random selection)
    uint256[] public verifierPool;
    /// @notice tokenId => index in verifierPool
    mapping(uint256 => uint256) internal _verifierPoolIndex;
    /// @notice tokenId => is in pool
    mapping(uint256 => bool) public isInPool;

    /// @notice problemId => verification data
    mapping(uint256 => ProblemVerification) internal _verifications;

    /// @notice problemId => tokenId => is elected for this problem
    mapping(uint256 => mapping(uint256 => bool)) public isElected;

    /// @notice tokenId => count of active (unresolved) verifications [H-03]
    mapping(uint256 => uint256) public activeVerificationCount;

    // ============ Events ============

    event VerifierStaked(uint256 indexed tokenId, uint256 amount);
    event VerifierUnstaked(uint256 indexed tokenId, uint256 amount);
    event VerifiersElected(uint256 indexed problemId, uint256[] tokenIds);
    event VoteCommitted(uint256 indexed problemId, uint256 indexed tokenId);
    event VoteRevealed(uint256 indexed problemId, uint256 indexed tokenId, bytes32 answerHash);
    event ConsensusReached(uint256 indexed problemId, bytes32 correctAnswer, uint256 agreeCount);
    event VerifierSlashed(uint256 indexed tokenId, uint256 amount);
    event OracleFallbackTriggered(uint256 indexed problemId);

    // ============ Errors ============

    error NotTokenOwner();
    error LevelTooLow();
    error InsufficientStake();
    error AlreadyStaked();
    error NotStaked();
    error NotElected();
    error AlreadyCommitted();
    error NotCommitted();
    error AlreadyRevealed();
    error InvalidReveal();
    error NotInVerifyPhase();
    error AlreadyResolved();
    error NotEnoughVerifiers();
    error ZeroAddress();
    error CannotUnstakeDuringVerification();

    // ============ Constructor ============

    constructor(
        address _afgToken,
        address _agentNFA,
        address _problemManager
    ) Ownable(msg.sender) {
        if (_afgToken == address(0) || _agentNFA == address(0) || _problemManager == address(0))
            revert ZeroAddress();
        afgToken = AFGToken(payable(_afgToken));
        agentNFA = AgentNFA(payable(_agentNFA));
        problemManager = ProblemManager(_problemManager);
    }

    function setProblemManager(address _pm) external onlyOwner {
        problemManager = ProblemManager(_pm);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // ============ Staking ============

    /**
     * @notice Stake AFG to become a verifier. Requires NFA Level >= MIN_VERIFIER_LEVEL.
     * @param tokenId The NFA to register as verifier
     * @param amount Amount of AFG to stake (must be >= MIN_STAKE)
     */
    function stake(uint256 tokenId, uint256 amount) external nonReentrant whenNotPaused {
        if (agentNFA.ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (agentNFA.getLevel(tokenId) < MIN_VERIFIER_LEVEL) revert LevelTooLow();
        if (amount < MIN_STAKE) revert InsufficientStake();
        if (isInPool[tokenId]) revert AlreadyStaked();

        // Transfer AFG from staker to this contract
        afgToken.transferFrom(msg.sender, address(this), amount);

        verifiers[tokenId] = VerifierInfo({
            tokenId: tokenId,
            stakedAmount: amount,
            active: true
        });

        // Add to pool
        _verifierPoolIndex[tokenId] = verifierPool.length;
        verifierPool.push(tokenId);
        isInPool[tokenId] = true;

        emit VerifierStaked(tokenId, amount);
    }

    /**
     * @notice Unstake and exit verifier pool
     */
    function unstake(uint256 tokenId) external nonReentrant {
        if (agentNFA.ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (!isInPool[tokenId]) revert NotStaked();
        if (activeVerificationCount[tokenId] > 0) revert CannotUnstakeDuringVerification();

        VerifierInfo storage v = verifiers[tokenId];
        uint256 amount = v.stakedAmount;

        // Remove from pool (swap-and-pop)
        uint256 idx = _verifierPoolIndex[tokenId];
        uint256 lastIdx = verifierPool.length - 1;
        if (idx != lastIdx) {
            uint256 lastTokenId = verifierPool[lastIdx];
            verifierPool[idx] = lastTokenId;
            _verifierPoolIndex[lastTokenId] = idx;
        }
        verifierPool.pop();
        delete _verifierPoolIndex[tokenId];
        isInPool[tokenId] = false;

        v.active = false;
        v.stakedAmount = 0;

        // Return staked AFG
        afgToken.transfer(msg.sender, amount);

        emit VerifierUnstaked(tokenId, amount);
    }

    // ============ Election ============

    /**
     * @notice Elect verifiers for a problem. Called when reveal phase ends.
     * @dev Uses blockhash + prevrandao for randomness. Non-participants only.
     */
    function electVerifiers(uint256 problemId) external whenNotPaused {
        ProblemManager.Problem memory prob = problemManager.getProblem(problemId);
        // Can only elect during/after reveal phase
        if (block.timestamp <= prob.submitDeadline) revert NotInVerifyPhase();

        ProblemVerification storage pv = _verifications[problemId];
        if (pv.electedVerifiers.length > 0) return; // Already elected

        // Filter eligible verifiers (not participants in this problem)
        uint256[] memory eligible = new uint256[](verifierPool.length);
        uint256 eligibleCount = 0;

        for (uint256 i = 0; i < verifierPool.length; i++) {
            uint256 tid = verifierPool[i];
            if (!problemManager.isParticipant(problemId, tid) && verifiers[tid].active) {
                // Re-check level (may have changed)
                if (agentNFA.getLevel(tid) >= MIN_VERIFIER_LEVEL) {
                    eligible[eligibleCount] = tid;
                    eligibleCount++;
                }
            }
        }

        // Select up to VERIFIER_COUNT using pseudo-random
        uint256 toSelect = eligibleCount < VERIFIER_COUNT ? eligibleCount : VERIFIER_COUNT;

        if (toSelect == 0) {
            // No eligible verifiers — oracle fallback will handle this
            emit OracleFallbackTriggered(problemId);
            return;
        }

        uint256 seed = uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            block.prevrandao,
            problemId
        )));

        // Fisher-Yates partial shuffle
        for (uint256 i = 0; i < toSelect; i++) {
            uint256 remaining = eligibleCount - i;
            uint256 j = i + (seed % remaining);
            seed = uint256(keccak256(abi.encodePacked(seed, i)));

            // Swap
            (eligible[i], eligible[j]) = (eligible[j], eligible[i]);

            pv.electedVerifiers.push(eligible[i]);
            isElected[problemId][eligible[i]] = true;
            activeVerificationCount[eligible[i]]++;
        }

        emit VerifiersElected(problemId, pv.electedVerifiers);
    }

    // ============ Commit-Reveal Voting ============

    /**
     * @notice Verifier commits their answer hash
     * @param commitHash keccak256(abi.encodePacked(answerHash, salt))
     */
    function commitVote(uint256 problemId, uint256 tokenId, bytes32 commitHash) external whenNotPaused {
        if (agentNFA.ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (!isElected[problemId][tokenId]) revert NotElected();

        ProblemVerification storage pv = _verifications[problemId];
        if (pv.resolved) revert AlreadyResolved();

        VerifierVote storage vote = pv.votes[tokenId];
        if (vote.committed) revert AlreadyCommitted();

        vote.commitHash = commitHash;
        vote.committed = true;

        emit VoteCommitted(problemId, tokenId);
    }

    /**
     * @notice Verifier reveals their vote
     * @param answerHash The answer hash they voted for
     * @param salt The salt used in commit
     */
    function revealVote(
        uint256 problemId,
        uint256 tokenId,
        bytes32 answerHash,
        bytes32 salt
    ) external {
        if (agentNFA.ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (!isElected[problemId][tokenId]) revert NotElected();

        ProblemVerification storage pv = _verifications[problemId];
        if (pv.resolved) revert AlreadyResolved();

        VerifierVote storage vote = pv.votes[tokenId];
        if (!vote.committed) revert NotCommitted();
        if (vote.revealed) revert AlreadyRevealed();

        // Verify commit matches reveal
        bytes32 expectedCommit = keccak256(abi.encodePacked(answerHash, salt));
        if (expectedCommit != vote.commitHash) revert InvalidReveal();

        vote.revealed = true;
        vote.revealedAnswer = answerHash;
        pv.revealCount++;

        emit VoteRevealed(problemId, tokenId, answerHash);
    }

    // ============ Resolution ============

    /**
     * @notice Tally votes and resolve if consensus reached. Anyone can call.
     */
    function tallyAndResolve(uint256 problemId) external {
        ProblemVerification storage pv = _verifications[problemId];
        if (pv.resolved) revert AlreadyResolved();

        uint256 electedCount = pv.electedVerifiers.length;

        // Need at least CONSENSUS_THRESHOLD reveals
        if (pv.revealCount < CONSENSUS_THRESHOLD) {
            // Check if we're past verify deadline — trigger oracle fallback
            ProblemManager.Problem memory prob = problemManager.getProblem(problemId);
            if (block.timestamp > prob.verifyDeadline) {
                pv.resolved = true;
                _releaseVerifiers(pv);
                emit OracleFallbackTriggered(problemId);
                return;
            }
            revert NotEnoughVerifiers();
        }

        // Count votes per answer
        bytes32 winningAnswer;
        uint256 maxVotes = 0;

        // Collect all unique answers and count them
        // Using a simple loop since we have max 5 verifiers
        bytes32[] memory answers = new bytes32[](electedCount);
        uint256[] memory counts = new uint256[](electedCount);
        uint256 uniqueCount = 0;

        for (uint256 i = 0; i < electedCount; i++) {
            uint256 tid = pv.electedVerifiers[i];
            VerifierVote storage vote = pv.votes[tid];
            if (!vote.revealed) continue;

            bytes32 ans = vote.revealedAnswer;
            bool found = false;
            for (uint256 j = 0; j < uniqueCount; j++) {
                if (answers[j] == ans) {
                    counts[j]++;
                    if (counts[j] > maxVotes) {
                        maxVotes = counts[j];
                        winningAnswer = ans;
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                answers[uniqueCount] = ans;
                counts[uniqueCount] = 1;
                if (1 > maxVotes) {
                    maxVotes = 1;
                    winningAnswer = ans;
                }
                uniqueCount++;
            }
        }

        // Check consensus
        if (maxVotes < CONSENSUS_THRESHOLD) {
            // No consensus — oracle fallback
            ProblemManager.Problem memory prob = problemManager.getProblem(problemId);
            if (block.timestamp > prob.verifyDeadline) {
                pv.resolved = true;
                _releaseVerifiers(pv);
                emit OracleFallbackTriggered(problemId);
                return;
            }
            revert NotEnoughVerifiers();
        }

        pv.resolved = true;

        // Slash dishonest verifiers (those who voted differently)
        for (uint256 i = 0; i < electedCount; i++) {
            uint256 tid = pv.electedVerifiers[i];
            VerifierVote storage vote = pv.votes[tid];

            if (vote.revealed && vote.revealedAnswer != winningAnswer) {
                // Slash
                uint256 slashAmount = (verifiers[tid].stakedAmount * SLASH_BPS) / 10000;
                if (slashAmount > 0 && verifiers[tid].stakedAmount >= slashAmount) {
                    verifiers[tid].stakedAmount -= slashAmount;
                    // Slashed AFG goes to dev/treasury (burned or redistributed)
                    afgToken.transfer(owner(), slashAmount);
                    emit VerifierSlashed(tid, slashAmount);
                }
            }
            // Non-voters who were elected but didn't vote — light slash
            if (!vote.revealed) {
                uint256 slashAmount = (verifiers[tid].stakedAmount * SLASH_BPS) / 20000; // 5%
                if (slashAmount > 0 && verifiers[tid].stakedAmount >= slashAmount) {
                    verifiers[tid].stakedAmount -= slashAmount;
                    afgToken.transfer(owner(), slashAmount);
                    emit VerifierSlashed(tid, slashAmount);
                }
            }
        }

        _releaseVerifiers(pv);

        emit ConsensusReached(problemId, winningAnswer, maxVotes);

        // Resolve the problem in ProblemManager
        problemManager.resolveByVerifiers(problemId, winningAnswer);
    }

    /// @dev Decrement activeVerificationCount for all elected verifiers [H-03]
    function _releaseVerifiers(ProblemVerification storage pv) internal {
        for (uint256 i = 0; i < pv.electedVerifiers.length; i++) {
            uint256 tid = pv.electedVerifiers[i];
            if (activeVerificationCount[tid] > 0) {
                activeVerificationCount[tid]--;
            }
        }
    }

    // ============ View Functions ============

    function getVerifierPoolSize() external view returns (uint256) {
        return verifierPool.length;
    }

    function getElectedVerifiers(uint256 problemId) external view returns (uint256[] memory) {
        return _verifications[problemId].electedVerifiers;
    }

    function getVerifierVote(uint256 problemId, uint256 tokenId) external view returns (
        bool committed, bool revealed, bytes32 revealedAnswer
    ) {
        VerifierVote storage v = _verifications[problemId].votes[tokenId];
        return (v.committed, v.revealed, v.revealedAnswer);
    }

    function getRevealCount(uint256 problemId) external view returns (uint256) {
        return _verifications[problemId].revealCount;
    }

    function isVerificationResolved(uint256 problemId) external view returns (bool) {
        return _verifications[problemId].resolved;
    }

    function getHonestVerifiers(uint256 problemId) external view returns (uint256[] memory) {
        ProblemVerification storage pv = _verifications[problemId];
        ProblemManager.Problem memory prob = problemManager.getProblem(problemId);
        bytes32 correctAnswer = prob.correctAnswerHash;

        uint256 count = 0;
        for (uint256 i = 0; i < pv.electedVerifiers.length; i++) {
            uint256 tid = pv.electedVerifiers[i];
            if (pv.votes[tid].revealed && pv.votes[tid].revealedAnswer == correctAnswer) {
                count++;
            }
        }

        uint256[] memory honest = new uint256[](count);
        uint256 idx = 0;
        for (uint256 i = 0; i < pv.electedVerifiers.length; i++) {
            uint256 tid = pv.electedVerifiers[i];
            if (pv.votes[tid].revealed && pv.votes[tid].revealedAnswer == correctAnswer) {
                honest[idx++] = tid;
            }
        }
        return honest;
    }
}
