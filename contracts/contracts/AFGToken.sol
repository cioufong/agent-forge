// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title AFGToken
 * @notice ERC-20 token for AgentForge protocol
 *   - Total supply cap: 100,000,000 AFG
 *   - 10% (10M) pre-minted to treasury at deploy
 *   - 90% (90M) released via problem-solving mining
 *   - Configurable DEX tax on trades to/from registered DEX pairs (default 3%)
 *   - Halving schedule based on elapsed time since deployment
 */
contract AFGToken is ERC20, Ownable, Pausable {
    uint256 public constant MAX_SUPPLY = 100_000_000 ether;
    uint256 public constant TREASURY_PREMINT = 10_000_000 ether;
    uint256 public constant MINING_POOL = 90_000_000 ether;

    /// @notice Number of rounds per halving period (7 days * 288 rounds/day = 2,016)
    uint256 public constant ROUNDS_PER_HALVING = 2_016;
    /// @notice Initial reward per round: 90M / 2,016 ≈ 44,642 AFG
    uint256 public constant INITIAL_REWARD_PER_ROUND = MINING_POOL / ROUNDS_PER_HALVING;
    /// @notice Round duration: 5 minutes
    uint256 public constant ROUND_DURATION = 5 minutes;

    uint256 public immutable deployedAt;
    address public immutable treasury;

    /// @notice Total AFG minted via mining
    uint256 public totalMined;

    /// @notice Only this address can call mint() — set to RewardDistributor
    address public minter;

    /// @notice DEX pair addresses subject to tax
    mapping(address => bool) public isDexPair;

    /// @notice DEX tax rate in basis points (default 300 = 3%, max 1000 = 10%)
    uint256 public dexTaxBps = 300;

    /// @notice Maximum allowed DEX tax rate (10%)
    uint256 public constant MAX_DEX_TAX_BPS = 1000;

    event MinterSet(address indexed minter);
    event DexPairSet(address indexed pair, bool enabled);
    event DexTaxBpsUpdated(uint256 newBps);

    error OnlyMinter();
    error ExceedsMiningPool();
    error ZeroAddress();
    error TaxTooHigh();

    modifier onlyMinter() {
        if (msg.sender != minter) revert OnlyMinter();
        _;
    }

    constructor(
        address _treasury
    ) ERC20("AgentForge", "AFG") Ownable(msg.sender) {
        if (_treasury == address(0)) revert ZeroAddress();
        treasury = _treasury;
        deployedAt = block.timestamp;

        // Pre-mint 10M to treasury
        _mint(_treasury, TREASURY_PREMINT);

        // Start paused
        _pause();
    }

    // ============ Admin ============

    function setMinter(address _minter) external onlyOwner {
        if (_minter == address(0)) revert ZeroAddress();
        minter = _minter;
        emit MinterSet(_minter);
    }

    function setDexPair(address pair, bool enabled) external onlyOwner {
        if (pair == address(0)) revert ZeroAddress();
        isDexPair[pair] = enabled;
        emit DexPairSet(pair, enabled);
    }

    function setDexTaxBps(uint256 _bps) external onlyOwner {
        if (_bps > MAX_DEX_TAX_BPS) revert TaxTooHigh();
        dexTaxBps = _bps;
        emit DexTaxBpsUpdated(_bps);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // ============ Mining ============

    /**
     * @notice Mint AFG rewards — only callable by RewardDistributor
     */
    function mint(address to, uint256 amount) external onlyMinter whenNotPaused {
        if (totalMined + amount > MINING_POOL) revert ExceedsMiningPool();
        totalMined += amount;
        _mint(to, amount);
    }

    /**
     * @notice Current reward per round based on halving schedule
     * @dev Uses bit-shift for halving: reward >> halvingCount
     */
    function currentRewardPerRound() public view returns (uint256) {
        uint256 elapsed = block.timestamp - deployedAt;
        uint256 roundsSinceStart = elapsed / ROUND_DURATION;
        uint256 halvingCount = roundsSinceStart / ROUNDS_PER_HALVING;

        // Cap at 20 halvings to avoid shifting to zero
        if (halvingCount > 20) return 0;

        return INITIAL_REWARD_PER_ROUND >> halvingCount;
    }

    // ============ DEX Tax ============

    /**
     * @notice Override _update to apply DEX tax on DEX pair transfers
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override {
        // Apply DEX tax if transferring to/from a registered pair
        if (value > 0 && from != address(0) && to != address(0)) {
            if (isDexPair[from] || isDexPair[to]) {
                uint256 tax = (value * dexTaxBps) / 10000;
                uint256 netAmount = value - tax;

                // Send tax to treasury
                super._update(from, treasury, tax);
                super._update(from, to, netAmount);
                return;
            }
        }

        super._update(from, to, value);
    }
}
