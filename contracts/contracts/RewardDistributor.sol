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
 *   If a tier has no winners, its pool accumulates and carries
 *   over to the next round. When that tier has winners again,
 *   they receive the accumulated pool.
 *
 *   Within each tier:
 *   - 20% bonus to 1st place (fastest correct)
 *   - 70% split equally among ALL correct answers (including 1st)
 *   - 8% to verifiers
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
    uint256 public constant FIRST_BONUS_BPS = 2000;      // 20% bonus to 1st place
    uint256 public constant ALL_CORRECT_BPS = 7000;      // 70% split among ALL correct (incl. 1st)
    uint256 public constant VERIFIERS_BPS = 800;          // 8%
    uint256 public constant DEV_BPS = 200;                // 2%

    /// @notice XP rewards per tier
    uint64 public constant BRONZE_XP_MIN = 10;
    uint64 public constant BRONZE_XP_MAX = 20;
    uint64 public constant SILVER_XP_MIN = 20;
    uint64 public constant SILVER_XP_MAX = 40;
    uint64 public constant GOLD_XP_MIN = 40;
    uint64 public constant GOLD_XP_MAX = 80;

    /// @notice Intelligence bonus: each INT point above base (8) gives 100 BPS (1%) bonus
    /// Max 10 points above base = 1000 BPS = 10% bonus at INT 18
    uint256 public constant INT_BASE = 8;
    uint256 public constant INT_BONUS_PER_POINT = 100; // 100 BPS = 1%

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

    /// @notice Accumulated unspent pools per tier (rolls over when no winners)
    mapping(uint8 => uint256) public unspentPool;

    // ============ Events ============

    event RewardsDistributed(uint256 indexed problemId, uint256 totalAmount);
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

        afgToken = AFGToken(payable(_afgToken));
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
     * @notice Distribute rewards for a resolved problem across all three tiers.
     *   If a tier has no winners, its pool accumulates for the next round.
     * @param problemId The resolved problem
     * @param bronzeWinners Ordered Bronze-tier winners (1st, 2nd, 3rd, 4th, 5th)
     * @param silverWinners Ordered Silver-tier winners
     * @param goldWinners Ordered Gold-tier winners
     */
    function distributeRewards(
        uint256 problemId,
        uint256[] calldata bronzeWinners,
        uint256[] calldata silverWinners,
        uint256[] calldata goldWinners
    ) external whenNotPaused {
        if (msg.sender != problemManager.oracle()) revert OnlyOracle();
        if (problemRewarded[problemId]) revert AlreadyRewarded();

        ProblemManager.Problem memory prob = problemManager.getProblem(problemId);
        if (!prob.resolved) revert ProblemNotResolved();

        problemRewarded[problemId] = true;

        uint256 roundReward = afgToken.currentRewardPerRound();
        if (roundReward == 0) return;

        uint256 distributed;

        // Bronze
        uint256 bronzePool = (roundReward * BRONZE_BPS) / 10000 + unspentPool[0];
        if (bronzeWinners.length > 0) {
            _distributeTierRewards(problemId, 0, bronzePool, bronzeWinners);
            distributed += bronzePool;
            unspentPool[0] = 0;
        } else {
            unspentPool[0] = bronzePool;
        }

        // Silver
        uint256 silverPool = (roundReward * SILVER_BPS) / 10000 + unspentPool[1];
        if (silverWinners.length > 0) {
            _distributeTierRewards(problemId, 1, silverPool, silverWinners);
            distributed += silverPool;
            unspentPool[1] = 0;
        } else {
            unspentPool[1] = silverPool;
        }

        // Gold
        uint256 goldPool = (roundReward * GOLD_BPS) / 10000 + unspentPool[2];
        if (goldWinners.length > 0) {
            _distributeTierRewards(problemId, 2, goldPool, goldWinners);
            distributed += goldPool;
            unspentPool[2] = 0;
        } else {
            unspentPool[2] = goldPool;
        }

        totalDistributed += distributed;
        emit RewardsDistributed(problemId, distributed);
    }

    // ============ Claim ============

    function claimRewards() external nonReentrant whenNotPaused {
        uint256 amount = pendingRewards[msg.sender];
        if (amount == 0) revert NoRewards();

        pendingRewards[msg.sender] = 0;
        bool ok = afgToken.transfer(msg.sender, amount);
        if (!ok) revert TransferFailed();

        emit RewardsClaimed(msg.sender, amount);
    }

    // ============ Internal ============

    function _distributeTierRewards(
        uint256 problemId,
        uint8 tier,
        uint256 pool,
        uint256[] calldata winnerTokenIds
    ) internal {
        // Dev fee
        uint256 devFee = (pool * DEV_BPS) / 10000;
        if (devFee > 0) {
            afgToken.mint(devWallet, devFee);
        }

        // Verifier fee
        uint256 verifierFee = (pool * VERIFIERS_BPS) / 10000;
        if (verifierFee > 0) {
            bool vDistributed = false;
            if (address(verifierElection) != address(0)) {
                uint256[] memory honestVerifiers = verifierElection.getHonestVerifiers(problemId);
                if (honestVerifiers.length > 0) {
                    uint256 perVerifier = verifierFee / honestVerifiers.length;
                    afgToken.mint(address(this), verifierFee);
                    for (uint256 i = 0; i < honestVerifiers.length; i++) {
                        address verifierOwner = agentNFA.ownerOf(honestVerifiers[i]);
                        pendingRewards[verifierOwner] += perVerifier;
                    }
                    vDistributed = true;
                }
            }
            if (!vDistributed) {
                afgToken.mint(devWallet, verifierFee);
            }
        }

        uint256 prizePool = pool - devFee - verifierFee;
        uint256 winnerCount = winnerTokenIds.length;

        // 1st place bonus: 20% of prize pool (extra on top of equal share)
        uint256 firstBonus = (prizePool * FIRST_BONUS_BPS) / (FIRST_BONUS_BPS + ALL_CORRECT_BPS);
        uint256 firstBonusWithInt = firstBonus + _intBonus(firstBonus, winnerTokenIds[0]);

        address firstOwner = agentNFA.ownerOf(winnerTokenIds[0]);
        pendingRewards[firstOwner] += firstBonusWithInt;
        afgToken.mint(address(this), firstBonusWithInt);

        // Equal share: 70% split among ALL correct answers (including 1st)
        uint256 equalPool = prizePool - firstBonus;
        uint256 perWinner = equalPool / winnerCount;

        for (uint256 i = 0; i < winnerCount; i++) {
            uint256 share = perWinner + _intBonus(perWinner, winnerTokenIds[i]);

            address winnerOwner = agentNFA.ownerOf(winnerTokenIds[i]);
            pendingRewards[winnerOwner] += share;
            afgToken.mint(address(this), share);

            bool isFirst = (i == 0);
            uint64 xpAmount = _applyIntBonusXP(_getXPForTier(tier, isFirst), winnerTokenIds[i]);
            agentNFA.grantXP(winnerTokenIds[i], xpAmount);
            agentNFA.recordSolve(winnerTokenIds[i]);
        }
    }

    function _getXPForTier(uint8 tier, bool isFirst) internal pure returns (uint64) {
        if (tier == 0) return isFirst ? BRONZE_XP_MAX : BRONZE_XP_MIN;
        if (tier == 1) return isFirst ? SILVER_XP_MAX : SILVER_XP_MIN;
        return isFirst ? GOLD_XP_MAX : GOLD_XP_MIN;
    }

    function _intBonus(uint256 baseAmount, uint256 tokenId) internal view returns (uint256) {
        AgentNFA.AgentTraits memory t = agentNFA.getTraits(tokenId);
        uint256 bonusBps = uint256(t.intelligence - INT_BASE) * INT_BONUS_PER_POINT;
        return (baseAmount * bonusBps) / 10000;
    }

    function _applyIntBonusXP(uint64 baseXP, uint256 tokenId) internal view returns (uint64) {
        AgentNFA.AgentTraits memory t = agentNFA.getTraits(tokenId);
        uint256 bonusBps = uint256(t.intelligence - INT_BASE) * INT_BONUS_PER_POINT;
        return uint64(uint256(baseXP) + (uint256(baseXP) * bonusBps) / 10000);
    }
}
