// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

interface IUniswapV2Router02 {
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
    function WETH() external pure returns (address);
}

/**
 * @title AFGToken
 * @notice ERC-20 token for AgentForge protocol
 *   - Total supply cap: 100,000,000 AFG
 *   - 10% (10M) pre-minted to treasury at deploy
 *   - 90% (90M) released via problem-solving mining
 *   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts
 *   - Halving schedule based on elapsed time since deployment
 *   - Auto-swap: accumulated tax AFG → BNB via PancakeSwap when threshold is reached
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
    IUniswapV2Router02 public router;

    /// @notice Total AFG minted via mining
    uint256 public totalMined;

    /// @notice Only this address can call mint() — set to RewardDistributor
    address public minter;

    /// @notice Addresses exempt from transfer tax (protocol contracts, treasury, etc.)
    mapping(address => bool) public isTaxExempt;

    /// @notice Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)
    uint256 public taxBps = 300;

    /// @notice Maximum allowed tax rate (10%)
    uint256 public constant MAX_TAX_BPS = 1000;

    /// @notice Minimum accumulated tax to trigger auto-swap
    uint256 public swapThreshold = 10_000 ether;

    /// @notice Maximum allowed swap threshold
    uint256 public constant MAX_SWAP_THRESHOLD = 1_000_000 ether;

    /// @notice Whether auto-swap is enabled
    bool public swapEnabled = true;

    /// @dev Reentrancy lock for swap operations
    bool private _swapping;

    event MinterSet(address indexed minter);
    event TaxExemptSet(address indexed account, bool exempt);
    event TaxBpsUpdated(uint256 newBps);
    event SwapThresholdUpdated(uint256 newThreshold);
    event SwapEnabledUpdated(bool enabled);
    event RouterUpdated(address indexed newRouter);
    event TaxSwapped(uint256 afgAmount, uint256 bnbAmount);

    error OnlyMinter();
    error OnlySelf();
    error ExceedsMiningPool();
    error ZeroAddress();
    error TaxTooHigh();
    error SwapThresholdTooHigh();

    modifier onlyMinter() {
        if (msg.sender != minter) revert OnlyMinter();
        _;
    }

    constructor(
        address _treasury,
        address _router
    ) ERC20("AgentForge", "AFG") Ownable(msg.sender) {
        if (_treasury == address(0)) revert ZeroAddress();
        if (_router == address(0)) revert ZeroAddress();
        treasury = _treasury;
        router = IUniswapV2Router02(_router);
        deployedAt = block.timestamp;

        // Pre-mint 10M to treasury
        _mint(_treasury, TREASURY_PREMINT);

        // Treasury, deployer, and this contract are tax-exempt by default
        isTaxExempt[_treasury] = true;
        isTaxExempt[msg.sender] = true;
        isTaxExempt[address(this)] = true;

        // Pre-approve router for max spending (gas optimization)
        _approve(address(this), _router, type(uint256).max);

        // Start paused
        _pause();
    }

    // ============ Admin ============

    function setMinter(address _minter) external onlyOwner {
        if (_minter == address(0)) revert ZeroAddress();
        minter = _minter;
        emit MinterSet(_minter);
    }

    function setTaxExempt(address account, bool exempt) external onlyOwner {
        if (account == address(0)) revert ZeroAddress();
        isTaxExempt[account] = exempt;
        emit TaxExemptSet(account, exempt);
    }

    function setTaxBps(uint256 _bps) external onlyOwner {
        if (_bps > MAX_TAX_BPS) revert TaxTooHigh();
        taxBps = _bps;
        emit TaxBpsUpdated(_bps);
    }

    function setSwapThreshold(uint256 _threshold) external onlyOwner {
        if (_threshold > MAX_SWAP_THRESHOLD) revert SwapThresholdTooHigh();
        swapThreshold = _threshold;
        emit SwapThresholdUpdated(_threshold);
    }

    function setSwapEnabled(bool _enabled) external onlyOwner {
        swapEnabled = _enabled;
        emit SwapEnabledUpdated(_enabled);
    }

    function setRouter(address _router) external onlyOwner {
        if (_router == address(0)) revert ZeroAddress();
        // Revoke old router approval before setting new one [H-01 fix]
        _approve(address(this), address(router), 0);
        router = IUniswapV2Router02(_router);
        _approve(address(this), _router, type(uint256).max);
        emit RouterUpdated(_router);
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

    // ============ Transfer Tax ============

    /**
     * @notice Override _update to apply transfer tax on all non-exempt transfers
     * @dev Tax accumulates in this contract; auto-swaps to BNB when threshold is reached
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override {
        // Apply tax unless sender or receiver is exempt (or mint/burn)
        if (value > 0 && from != address(0) && to != address(0)) {
            if (!isTaxExempt[from] && !isTaxExempt[to]) {
                uint256 tax = (value * taxBps) / 10000;
                uint256 netAmount = value - tax;

                // Accumulate tax in this contract (instead of sending to treasury)
                super._update(from, address(this), tax);
                super._update(from, to, netAmount);

                // Auto-swap if conditions are met (try-catch to never block transfers) [C-01 fix]
                if (swapEnabled && !_swapping && balanceOf(address(this)) >= swapThreshold) {
                    _swapping = true;
                    try this.executeSwap(swapThreshold) {} catch {}
                    _swapping = false;
                }
                return;
            }
        }

        super._update(from, to, value);
    }

    /**
     * @notice Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract.
     * @dev External so it can be wrapped in try-catch within _update [C-01 fix]
     */
    function executeSwap(uint256 amount) external {
        if (msg.sender != address(this)) revert OnlySelf();

        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = router.WETH();

        uint256 balBefore = treasury.balance;

        router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            amount,
            0, // accept any amount of BNB (risk bounded by threshold)
            path,
            treasury,
            block.timestamp
        );

        emit TaxSwapped(amount, treasury.balance - balBefore);
    }

    /// @dev Required to receive BNB from router during swap
    receive() external payable {}
}
