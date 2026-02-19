// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./AgentNFA.sol";

/**
 * @title ProblemManager
 * @notice 4-phase problem lifecycle: Submit → Reveal → Verify → Resolve
 *
 *   Phase 1 - SUBMIT (5 min): Agents submit keccak256(answer) on-chain
 *   Phase 2 - REVEAL (2 min): Agents reveal plaintext, contract verifies hash
 *   Phase 3 - VERIFY (3 min): Elected verifiers vote on correct answer (commit-reveal)
 *   Phase 4 - RESOLVE: Consensus determines winners; oracle fallback if no quorum
 */
contract ProblemManager is Ownable, Pausable {

    // ============ Enums ============

    enum Phase { Submit, Reveal, Verify, Resolved }

    // ============ Constants ============

    uint64 public constant SUBMIT_DURATION = 5 minutes;
    uint64 public constant REVEAL_DURATION = 2 minutes;
    uint64 public constant VERIFY_DURATION = 3 minutes;

    // ============ Structs ============

    struct Problem {
        bytes32 questionHash;
        uint64 createdAt;
        uint64 submitDeadline;   // end of submit phase
        uint64 revealDeadline;   // end of reveal phase
        uint64 verifyDeadline;   // end of verify phase
        bool resolved;
        bytes32 correctAnswerHash;
        bool oracleFallback;     // true if resolved via oracle fallback
    }

    struct Submission {
        uint256 tokenId;
        bytes32 answerHash;
        uint64 submittedAt;
        bool revealed;
        bytes32 revealedAnswerHash; // keccak256(plaintext) after reveal
    }

    // ============ State ============

    AgentNFA public immutable agentNFA;
    address public oracle;

    uint256 public problemCount;

    mapping(uint256 => Problem) public problems;
    /// @notice problemId => tokenId => submission index + 1 (0 = not submitted)
    mapping(uint256 => mapping(uint256 => uint256)) public submissionIndex;
    /// @notice problemId => all submissions
    mapping(uint256 => Submission[]) internal _submissions;
    /// @notice problemId => winner tokenIds
    mapping(uint256 => uint256[]) public winners;

    /// @notice problemId => set of unique revealed answer hashes
    mapping(uint256 => bytes32[]) internal _revealedAnswerSet;
    /// @notice problemId => answerHash => count of agents who revealed this answer
    mapping(uint256 => mapping(bytes32 => uint256)) public revealedAnswerCount;
    /// @notice problemId => answerHash => tokenIds that revealed this answer
    mapping(uint256 => mapping(bytes32 => uint256[])) internal _answerTokenIds;

    // ============ Events ============

    event ProblemPosted(uint256 indexed problemId, bytes32 questionHash, uint64 submitDeadline);
    event AnswerSubmitted(uint256 indexed problemId, uint256 indexed tokenId, bytes32 answerHash);
    event AnswerRevealed(uint256 indexed problemId, uint256 indexed tokenId, bytes32 answerHash);
    event ProblemResolved(uint256 indexed problemId, bytes32 correctAnswerHash, uint256[] winnerTokenIds, bool oracleFallback);
    event OracleUpdated(address indexed newOracle);

    // ============ Errors ============

    error OnlyOracle();
    error ProblemNotFound();
    error ProblemAlreadyResolved();
    error NotInSubmitPhase();
    error NotInRevealPhase();
    error NotInVerifyPhase();
    error NotPastVerifyPhase();
    error AlreadySubmitted();
    error NotTokenOwner();
    error TokenNotEligible();
    error ZeroAddress();
    error InvalidWinners();
    error NotSubmitted();
    error AlreadyRevealed();
    error HashMismatch();
    error VerifyPhaseNotOver();

    modifier onlyOracle() {
        if (msg.sender != oracle) revert OnlyOracle();
        _;
    }

    // ============ Constructor ============

    constructor(
        address _agentNFA,
        address _oracle
    ) Ownable(msg.sender) {
        if (_agentNFA == address(0) || _oracle == address(0)) revert ZeroAddress();
        agentNFA = AgentNFA(_agentNFA);
        oracle = _oracle;
        _pause();
    }

    // ============ Admin ============

    function setOracle(address _oracle) external onlyOwner {
        if (_oracle == address(0)) revert ZeroAddress();
        oracle = _oracle;
        emit OracleUpdated(_oracle);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // ============ Phase Helpers ============

    function getPhase(uint256 problemId) public view returns (Phase) {
        Problem storage p = problems[problemId];
        if (p.createdAt == 0) revert ProblemNotFound();
        if (p.resolved) return Phase.Resolved;
        if (block.timestamp <= p.submitDeadline) return Phase.Submit;
        if (block.timestamp <= p.revealDeadline) return Phase.Reveal;
        if (block.timestamp <= p.verifyDeadline) return Phase.Verify;
        // Past verify deadline but not resolved — waiting for resolution
        return Phase.Verify;
    }

    // ============ Oracle: Post Problem ============

    function postProblem(bytes32 questionHash) external onlyOracle whenNotPaused returns (uint256) {
        uint256 problemId = problemCount;
        unchecked { problemCount++; }

        uint64 now_ = uint64(block.timestamp);
        problems[problemId] = Problem({
            questionHash: questionHash,
            createdAt: now_,
            submitDeadline: now_ + SUBMIT_DURATION,
            revealDeadline: now_ + SUBMIT_DURATION + REVEAL_DURATION,
            verifyDeadline: now_ + SUBMIT_DURATION + REVEAL_DURATION + VERIFY_DURATION,
            resolved: false,
            correctAnswerHash: bytes32(0),
            oracleFallback: false
        });

        emit ProblemPosted(problemId, questionHash, now_ + SUBMIT_DURATION);
        return problemId;
    }

    // ============ Phase 1: Submit ============

    function submitAnswer(
        uint256 problemId,
        uint256 tokenId,
        bytes32 answerHash
    ) external whenNotPaused {
        Problem storage p = problems[problemId];
        if (p.createdAt == 0) revert ProblemNotFound();
        if (p.resolved) revert ProblemAlreadyResolved();
        if (block.timestamp > p.submitDeadline) revert NotInSubmitPhase();

        if (agentNFA.ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (!agentNFA.isEligible(tokenId)) revert TokenNotEligible();

        if (submissionIndex[problemId][tokenId] != 0) revert AlreadySubmitted();

        _submissions[problemId].push(Submission({
            tokenId: tokenId,
            answerHash: answerHash,
            submittedAt: uint64(block.timestamp),
            revealed: false,
            revealedAnswerHash: bytes32(0)
        }));

        // Store index + 1 (so 0 means "not submitted")
        submissionIndex[problemId][tokenId] = _submissions[problemId].length;

        emit AnswerSubmitted(problemId, tokenId, answerHash);
    }

    // ============ Phase 2: Reveal ============

    /**
     * @notice Reveal the plaintext answer. Contract verifies hash matches.
     * @param problemId The problem
     * @param tokenId The NFA that submitted
     * @param answer The plaintext answer string
     */
    function revealAnswer(
        uint256 problemId,
        uint256 tokenId,
        string calldata answer
    ) external {
        Problem storage p = problems[problemId];
        if (p.createdAt == 0) revert ProblemNotFound();
        if (p.resolved) revert ProblemAlreadyResolved();
        if (block.timestamp <= p.submitDeadline || block.timestamp > p.revealDeadline)
            revert NotInRevealPhase();

        uint256 idx = submissionIndex[problemId][tokenId];
        if (idx == 0) revert NotSubmitted();
        idx--; // Convert to 0-based

        Submission storage sub = _submissions[problemId][idx];
        if (sub.revealed) revert AlreadyRevealed();

        // Verify hash matches
        bytes32 computedHash = keccak256(abi.encodePacked(answer));
        if (computedHash != sub.answerHash) revert HashMismatch();

        sub.revealed = true;
        sub.revealedAnswerHash = computedHash;

        // Track answer distribution
        if (revealedAnswerCount[problemId][computedHash] == 0) {
            _revealedAnswerSet[problemId].push(computedHash);
        }
        revealedAnswerCount[problemId][computedHash]++;
        _answerTokenIds[problemId][computedHash].push(tokenId);

        emit AnswerRevealed(problemId, tokenId, computedHash);
    }

    // ============ Phase 4: Resolve ============

    /**
     * @notice Resolve using verifier consensus. Called by VerifierElection.
     * @param problemId The problem to resolve
     * @param correctAnswerHash The answer hash that verifiers agreed on
     */
    function resolveByVerifiers(
        uint256 problemId,
        bytes32 correctAnswerHash
    ) external {
        // Only VerifierElection contract can call this (set as oracle or separate role)
        // For flexibility, we allow the oracle OR the caller to be authorized
        // The VerifierElection contract will be authorized via setResolver
        if (msg.sender != resolver && msg.sender != oracle) revert OnlyOracle();

        _resolve(problemId, correctAnswerHash, false);
    }

    /**
     * @notice Oracle fallback resolution — only when verify phase is over and no verifier consensus
     */
    function resolveByOracle(
        uint256 problemId,
        bytes32 correctAnswerHash
    ) external onlyOracle {
        Problem storage p = problems[problemId];
        if (p.createdAt == 0) revert ProblemNotFound();
        if (p.resolved) revert ProblemAlreadyResolved();
        // Oracle fallback only available after verify deadline
        if (block.timestamp <= p.verifyDeadline) revert VerifyPhaseNotOver();

        _resolve(problemId, correctAnswerHash, true);
    }

    function _resolve(
        uint256 problemId,
        bytes32 correctAnswerHash,
        bool isFallback
    ) internal {
        Problem storage p = problems[problemId];
        if (p.createdAt == 0) revert ProblemNotFound();
        if (p.resolved) revert ProblemAlreadyResolved();

        p.resolved = true;
        p.correctAnswerHash = correctAnswerHash;
        p.oracleFallback = isFallback;

        // Determine winners: all tokenIds that revealed this answer
        uint256[] storage tokenIds = _answerTokenIds[problemId][correctAnswerHash];
        for (uint256 i = 0; i < tokenIds.length; i++) {
            winners[problemId].push(tokenIds[i]);
        }

        emit ProblemResolved(problemId, correctAnswerHash, winners[problemId], isFallback);
    }

    // ============ Resolver (VerifierElection) ============

    address public resolver;

    function setResolver(address _resolver) external onlyOwner {
        resolver = _resolver;
    }

    // ============ View Functions ============

    function hasSubmitted(uint256 problemId, uint256 tokenId) external view returns (bool) {
        return submissionIndex[problemId][tokenId] != 0;
    }

    function getProblem(uint256 problemId) external view returns (Problem memory) {
        return problems[problemId];
    }

    function getSubmissionCount(uint256 problemId) external view returns (uint256) {
        return _submissions[problemId].length;
    }

    function getSubmission(uint256 problemId, uint256 index) external view returns (Submission memory) {
        return _submissions[problemId][index];
    }

    function getWinners(uint256 problemId) external view returns (uint256[] memory) {
        return winners[problemId];
    }

    function getRevealedAnswers(uint256 problemId) external view returns (bytes32[] memory) {
        return _revealedAnswerSet[problemId];
    }

    function getAnswerTokenIds(uint256 problemId, bytes32 answerHash) external view returns (uint256[] memory) {
        return _answerTokenIds[problemId][answerHash];
    }

    function isActive(uint256 problemId) external view returns (bool) {
        Problem storage p = problems[problemId];
        return p.createdAt > 0 && !p.resolved && block.timestamp <= p.submitDeadline;
    }

    /// @notice Check if a specific tokenId participated in a problem (for verifier eligibility)
    function isParticipant(uint256 problemId, uint256 tokenId) external view returns (bool) {
        return submissionIndex[problemId][tokenId] != 0;
    }
}
