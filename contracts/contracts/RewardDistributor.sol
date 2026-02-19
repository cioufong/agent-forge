// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AFGToken.sol";
import "./AgentNFA.sol";
import "./ProblemManager.sol";
import "./VerifierElection.sol";

/**
 * @title RewardDistributor
 * @notice Distributes AFG rewards based on three-tier system
 *   - Bronze (Level 1-7): 20% of round reward
 *   - Silver (Level 8-14): 30% of round reward
 *   - Gold (Level 15-20): 50% of round reward
 *
 *   Within each tier:
 *   - 50% to 1st place
 *   - 40% to 2nd-5th place (split equally)
 *   - 8% to verifiers (Phase 2)
 *   - 2% to dev wallet
 *
 *   Pull pattern: rewards accumulate, users claim
 */
contract RewardDistributor is Ownable, Pausable, ReentrancyGuard {

    // ============ Constants ============

    /// @notice Tier pool allocation in basis points
    uint256 public constant BRONZE_BPS = 2000; // 20%
    uint256 public constant SILVER_BPS = 3000; // 30%
    uint256 public constant GOLD_BPS = 5000;   // 50%

    /// @notice Within-tier distribution
    uint256 public constant FIRST_PLACE_BPS = 5000;    // 50%
    uint256 public constant RUNNERS_UP_BPS = 4000;      // 40% (split among 2-5th)
    uint256 public constant VERIFIERS_BPS = 800;         // 8%
    uint256 public constant DEV_BPS = 200;               // 2%

    /// @notice XP rewards per tier
    uint64 public constant BRONZE_XP_MIN = 10;
    uint64 public constant BRONZE_XP_MAX = 20;
    uint64 public constant SILVER_XP_MIN = 20;
    uint64 public constant SILVER_XP_MAX = 40;
    uint64 public constant GOLD_XP_MIN = 40;
    uint64 public constant GOLD_XP_MAX = 80;

    // ============ State ============

    AFGToken public immutable afgToken;
    AgentNFA public immutable agentNFA;
    ProblemManager public immutable problemManager;
    VerifierElection public verifierElection;
    address public devWallet;

    /// @notice Pending rewards per address (pull pattern)
    mapping(address => uint256) public pendingRewards;

    /// @notice Total rewards distributed
    uint256 public totalDistributed;

    /// @notice Track which problems have been rewarded
    mapping(uint256 => bool) public problemRewarded;

    // ============ Events ============

    event RewardsDistributed(uint256 indexed problemId, uint8 tier, uint256 totalAmount, uint256[] winnerTokenIds);
    event RewardsClaimed(address indexed account, uint256 amount);
    event DevWalletUpdated(address indexed newDevWallet);

    // ============ Errors ============

    error ZeroAddress();
    error NoRewards();
    error AlreadyRewarded();
    error ProblemNotResolved();
    error OnlyOracle();
    error TransferFailed();

    // ============ Constructor ============

    constructor(
        address _afgToken,
        address _agentNFA,
        address _problemManager,
        address _devWallet
    ) Ownable(msg.sender) {
        if (_afgToken == address(0) || _agentNFA == address(0) ||
            _problemManager == address(0) || _devWallet == address(0))
            revert ZeroAddress();

        afgToken = AFGToken(_afgToken);
        agentNFA = AgentNFA(_agentNFA);
        problemManager = ProblemManager(_problemManager);
        devWallet = _devWallet;

        _pause();
    }

    // ============ Admin ============

    function setVerifierElection(address _ve) external onlyOwner {
        verifierElection = VerifierElection(_ve);
    }

    function setDevWallet(address _devWallet) external onlyOwner {
        if (_devWallet == address(0)) revert ZeroAddress();
        devWallet = _devWallet;
        emit DevWalletUpdated(_devWallet);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // ============ Distribution ============

    /**
     * @notice Distribute rewards for a resolved problem
     * @param problemId The resolved problem
     * @param tier 0=Bronze, 1=Silver, 2=Gold
     * @param winnerTokenIds Ordered winners (1st, 2nd, 3rd, 4th, 5th)
     */
    function distributeRewards(
        uint256 problemId,
        uint8 tier,
        uint256[] calldata winnerTokenIds
    ) external whenNotPaused {
        // Only oracle (same as ProblemManager's oracle) can distribute
        if (msg.sender != problemManager.oracle()) revert OnlyOracle();
        if (problemRewarded[problemId]) revert AlreadyRewarded();

        // Verify problem is resolved
        ProblemManager.Problem memory prob = problemManager.getProblem(problemId);
        if (!prob.resolved) revert ProblemNotResolved();

        problemRewarded[problemId] = true;

        // Calculate round reward
        uint256 roundReward = afgToken.currentRewardPerRound();
        if (roundReward == 0) return;

        // Calculate tier pool
        uint256 tierPool;
        if (tier == 0) tierPool = (roundReward * BRONZE_BPS) / 10000;
        else if (tier == 1) tierPool = (roundReward * SILVER_BPS) / 10000;
        else tierPool = (roundReward * GOLD_BPS) / 10000;

        if (tierPool == 0) return;

        // Dev fee
        uint256 devFee = (tierPool * DEV_BPS) / 10000;
        if (devFee > 0) {
            afgToken.mint(devWallet, devFee);
        }

        // Verifier fee — distribute to honest verifiers, or devWallet if none
        uint256 verifierFee = (tierPool * VERIFIERS_BPS) / 10000;
        if (verifierFee > 0) {
            bool distributed = false;
            if (address(verifierElection) != address(0)) {
                uint256[] memory honestVerifiers = verifierElection.getHonestVerifiers(problemId);
                if (honestVerifiers.length > 0) {
                    uint256 perVerifier = verifierFee / honestVerifiers.length;
                    afgToken.mint(address(this), verifierFee);
                    for (uint256 i = 0; i < honestVerifiers.length; i++) {
                        address verifierOwner = agentNFA.ownerOf(honestVerifiers[i]);
                        pendingRewards[verifierOwner] += perVerifier;
                    }
                    distributed = true;
                }
            }
            if (!distributed) {
                afgToken.mint(devWallet, verifierFee);
            }
        }

        uint256 prizePool = tierPool - devFee - verifierFee;

        if (winnerTokenIds.length > 0) {
            // 1st place: 50% of prize pool
            uint256 firstPrize = (prizePool * FIRST_PLACE_BPS) / (FIRST_PLACE_BPS + RUNNERS_UP_BPS);

            address firstOwner = agentNFA.ownerOf(winnerTokenIds[0]);
            pendingRewards[firstOwner] += firstPrize;
            afgToken.mint(address(this), firstPrize);

            // Grant XP to winner
            uint64 xpAmount = _getXPForTier(tier, true);
            agentNFA.grantXP(winnerTokenIds[0], xpAmount);
            agentNFA.recordSolve(winnerTokenIds[0]);

            // 2nd-5th place: split remaining prize pool
            if (winnerTokenIds.length > 1) {
                uint256 runnersUpTotal = prizePool - firstPrize;
                uint256 perRunner = runnersUpTotal / (winnerTokenIds.length - 1);

                for (uint256 i = 1; i < winnerTokenIds.length; i++) {
                    address runnerOwner = agentNFA.ownerOf(winnerTokenIds[i]);
                    pendingRewards[runnerOwner] += perRunner;
                    afgToken.mint(address(this), perRunner);

                    uint64 runnerXP = _getXPForTier(tier, false);
                    agentNFA.grantXP(winnerTokenIds[i], runnerXP);
                    agentNFA.recordSolve(winnerTokenIds[i]);
                }
            }
        }

        totalDistributed += tierPool;
        emit RewardsDistributed(problemId, tier, tierPool, winnerTokenIds);
    }

    // ============ Claim ============

    /**
     * @notice Claim accumulated rewards
     */
    function claimRewards() external nonReentrant whenNotPaused {
        uint256 amount = pendingRewards[msg.sender];
        if (amount == 0) revert NoRewards();

        pendingRewards[msg.sender] = 0;
        bool ok = afgToken.transfer(msg.sender, amount);
        if (!ok) revert TransferFailed();

        emit RewardsClaimed(msg.sender, amount);
    }

    // ============ Internal ============

    function _getXPForTier(uint8 tier, bool isFirst) internal pure returns (uint64) {
        if (tier == 0) return isFirst ? BRONZE_XP_MAX : BRONZE_XP_MIN;
        if (tier == 1) return isFirst ? SILVER_XP_MAX : SILVER_XP_MIN;
        return isFirst ? GOLD_XP_MAX : GOLD_XP_MIN;
    }
}
