// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IMetadataRenderer.sol";
import "./IBAP578.sol";

/**
 * @title AgentNFA
 * @notice ERC-721 + BAP-578 NFA for AgentForge AI Agents
 *   - Mint NFA = register an AI Agent
 *   - On-chain traits generated from blockhash + prevrandao
 *   - XP / Level system updated by RewardDistributor
 *   - BAP-578: full agent lifecycle (status, funding, logic, metadata)
 */
contract AgentNFA is ERC721, ERC721Burnable, Ownable, Pausable, ReentrancyGuard, IBAP578 {

    // ============ Enums ============

    enum Specialization { Math, Code, Trivia }
    enum TalentRarity { Common, Rare, Epic, Legendary, Mythic }

    // ============ Structs ============

    struct AgentTraits {
        uint8 intelligence;    // 8-18, affects weighted score
        uint8 speed;           // 8-18, tiebreaker priority
        Specialization specialization; // 0=math, 1=code, 2=trivia
        TalentRarity talentRarity;     // 0-4
    }

    struct AgentStats {
        uint64 xp;
        uint8 level;           // 1-20
        uint32 problemsSolved;
        uint32 problemsAttempted;
        uint64 mintedAt;
    }

    // ============ State ============

    uint256 private _tokenIdCounter;
    uint256 public mintPrice;

    mapping(uint256 => AgentTraits) public traits;
    mapping(uint256 => AgentStats) public stats;

    /// @notice BAP-578: experience text per token
    mapping(uint256 => string) public experience;
    /// @notice BAP-578: vault URI per token
    mapping(uint256 => string) public vaultURI;
    /// @notice BAP-578: vault hash per token
    mapping(uint256 => bytes32) public vaultHash;

    /// @notice Addresses authorized to grant XP and update metadata
    mapping(address => bool) public isGameMaster;

    IMetadataRenderer public metadataRenderer;

    // ============ XP thresholds for leveling (cumulative) ============
    // Level 2 = 100 XP, Level 3 = 300, ... Level 20 = 19000
    uint64[20] public levelThresholds;

    // ============ BAP-578 State ============

    mapping(uint256 => Status) public agentStatus;
    mapping(uint256 => address) public logicAddress;
    mapping(uint256 => uint256) public lastActionTimestamp;
    mapping(uint256 => uint256) public agentBalance;
    uint256 public totalAgentBalance;
    mapping(uint256 => string) public persona;
    mapping(uint256 => string) public voiceHash;
    mapping(uint256 => string) public animationURI;

    // ============ Events ============

    event AgentMinted(uint256 indexed tokenId, address indexed to, uint8 intelligence, uint8 speed, uint8 specialization, uint8 talentRarity);
    event XPGranted(uint256 indexed tokenId, uint64 amount, uint8 newLevel);
    event ExperienceUpdated(uint256 indexed tokenId, string experience);
    event VaultUpdated(uint256 indexed tokenId, string uri, bytes32 hash);
    event GameMasterSet(address indexed account, bool enabled);
    event RendererUpdated(address indexed newRenderer);
    event MintPriceUpdated(uint256 newPrice);

    // ============ Errors ============

    error InsufficientPayment();
    error NotGameMaster();
    error TokenDoesNotExist();
    error ZeroAddress();
    error NotTokenOwner();
    error AgentNotActive();
    error AgentTerminated();
    error AgentNotPaused();
    error NoLogicAddress();
    error ActionFailed();
    error InsufficientAgentBalance();

    // ============ Modifiers ============

    modifier onlyGameMaster() {
        if (!isGameMaster[msg.sender] && msg.sender != owner()) revert NotGameMaster();
        _;
    }

    modifier onlyTokenOwner(uint256 tokenId) {
        if (ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        _;
    }

    // ============ Constructor ============

    constructor(
        uint256 _mintPrice
    ) ERC721("AgentForge NFA", "AGENT") Ownable(msg.sender) {
        mintPrice = _mintPrice;
        _tokenIdCounter = 1;

        // Initialize level thresholds (cumulative XP needed)
        levelThresholds[0] = 0;       // Level 1: 0 XP
        levelThresholds[1] = 100;     // Level 2
        levelThresholds[2] = 300;     // Level 3
        levelThresholds[3] = 600;     // Level 4
        levelThresholds[4] = 1000;    // Level 5
        levelThresholds[5] = 1500;    // Level 6
        levelThresholds[6] = 2100;    // Level 7
        levelThresholds[7] = 2800;    // Level 8
        levelThresholds[8] = 3600;    // Level 9
        levelThresholds[9] = 4500;    // Level 10
        levelThresholds[10] = 5500;   // Level 11
        levelThresholds[11] = 6600;   // Level 12
        levelThresholds[12] = 7800;   // Level 13
        levelThresholds[13] = 9100;   // Level 14
        levelThresholds[14] = 10500;  // Level 15
        levelThresholds[15] = 12000;  // Level 16
        levelThresholds[16] = 13600;  // Level 17
        levelThresholds[17] = 15300;  // Level 18
        levelThresholds[18] = 17100;  // Level 19
        levelThresholds[19] = 19000;  // Level 20

        _pause();
    }

    // ============ Admin ============

    function setMetadataRenderer(address _renderer) external onlyOwner {
        if (_renderer == address(0)) revert ZeroAddress();
        metadataRenderer = IMetadataRenderer(_renderer);
        emit RendererUpdated(_renderer);
    }

    function setGameMaster(address account, bool enabled) external onlyOwner {
        if (account == address(0)) revert ZeroAddress();
        isGameMaster[account] = enabled;
        emit GameMasterSet(account, enabled);
    }

    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
        emit MintPriceUpdated(_mintPrice);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function withdraw() external onlyOwner {
        uint256 available = address(this).balance - totalAgentBalance;
        (bool ok, ) = owner().call{value: available}("");
        require(ok);
    }

    // ============ Mint ============

    function mint() external payable whenNotPaused nonReentrant returns (uint256) {
        if (msg.value < mintPrice) revert InsufficientPayment();

        uint256 tokenId = _tokenIdCounter;
        unchecked { _tokenIdCounter++; }

        // Generate traits from blockhash + prevrandao
        uint256 seed = uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            block.prevrandao,
            msg.sender,
            tokenId
        )));

        AgentTraits memory t;
        t.intelligence = uint8(8 + (seed % 11));        // 8-18
        t.speed = uint8(8 + ((seed >> 8) % 11));        // 8-18
        t.specialization = Specialization((seed >> 16) % 3); // 0-2

        // Rarity distribution: Common 50%, Rare 25%, Epic 15%, Legendary 8%, Mythic 2%
        uint256 rarityRoll = (seed >> 24) % 100;
        if (rarityRoll < 50) t.talentRarity = TalentRarity.Common;
        else if (rarityRoll < 75) t.talentRarity = TalentRarity.Rare;
        else if (rarityRoll < 90) t.talentRarity = TalentRarity.Epic;
        else if (rarityRoll < 98) t.talentRarity = TalentRarity.Legendary;
        else t.talentRarity = TalentRarity.Mythic;

        traits[tokenId] = t;
        stats[tokenId] = AgentStats({
            xp: 0,
            level: 1,
            problemsSolved: 0,
            problemsAttempted: 0,
            mintedAt: uint64(block.timestamp)
        });

        // BAP-578: initialize agent state
        agentStatus[tokenId] = Status.Active;
        lastActionTimestamp[tokenId] = block.timestamp;

        _safeMint(msg.sender, tokenId);

        emit AgentMinted(
            tokenId,
            msg.sender,
            t.intelligence,
            t.speed,
            uint8(t.specialization),
            uint8(t.talentRarity)
        );

        return tokenId;
    }

    // ============ Game Master Functions ============

    function grantXP(uint256 tokenId, uint64 amount) external onlyGameMaster {
        _requireOwned(tokenId);

        AgentStats storage s = stats[tokenId];
        s.xp += amount;

        // Check for level up
        uint8 newLevel = s.level;
        for (uint8 i = s.level; i < 20; i++) {
            if (s.xp >= levelThresholds[i]) {
                newLevel = i + 1;
            } else {
                break;
            }
        }
        s.level = newLevel;

        emit XPGranted(tokenId, amount, newLevel);
    }

    function recordAttempt(uint256 tokenId) external onlyGameMaster {
        _requireOwned(tokenId);
        stats[tokenId].problemsAttempted++;
    }

    function recordSolve(uint256 tokenId) external onlyGameMaster {
        _requireOwned(tokenId);
        stats[tokenId].problemsSolved++;
    }

    function setExperience(uint256 tokenId, string calldata _experience) external onlyGameMaster {
        _requireOwned(tokenId);
        experience[tokenId] = _experience;
        emit ExperienceUpdated(tokenId, _experience);
    }

    function setVault(uint256 tokenId, string calldata _uri, bytes32 _hash) external onlyGameMaster {
        _requireOwned(tokenId);
        vaultURI[tokenId] = _uri;
        vaultHash[tokenId] = _hash;
        emit VaultUpdated(tokenId, _uri, _hash);
    }

    // ============ BAP-578 Functions ============

    /// @inheritdoc IBAP578
    function executeAction(uint256 tokenId, bytes calldata data) external onlyTokenOwner(tokenId) nonReentrant returns (bytes memory) {
        if (agentStatus[tokenId] != Status.Active) revert AgentNotActive();
        address logic = logicAddress[tokenId];
        if (logic == address(0)) revert NoLogicAddress();

        lastActionTimestamp[tokenId] = block.timestamp;

        (bool success, bytes memory result) = logic.call(data);
        if (!success) revert ActionFailed();

        emit ActionExecuted(tokenId, logic, data);
        return result;
    }

    /// @inheritdoc IBAP578
    function setLogicAddress(uint256 tokenId, address logic) external onlyTokenOwner(tokenId) {
        if (agentStatus[tokenId] == Status.Terminated) revert AgentTerminated();
        logicAddress[tokenId] = logic;
        emit LogicUpgraded(tokenId, logic);
    }

    /// @inheritdoc IBAP578
    function fundAgent(uint256 tokenId) external payable {
        _requireOwned(tokenId);
        agentBalance[tokenId] += msg.value;
        totalAgentBalance += msg.value;
        emit AgentFunded(tokenId, msg.sender, msg.value);
    }

    /// @notice Withdraw BNB from an agent's balance
    function withdrawFromAgent(uint256 tokenId, uint256 amount) external onlyTokenOwner(tokenId) nonReentrant {
        if (agentBalance[tokenId] < amount) revert InsufficientAgentBalance();
        agentBalance[tokenId] -= amount;
        totalAgentBalance -= amount;

        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok);
    }

    /// @inheritdoc IBAP578
    function getState(uint256 tokenId) external view returns (State memory) {
        _requireOwned(tokenId);
        return State({
            balance: agentBalance[tokenId],
            status: agentStatus[tokenId],
            owner: ownerOf(tokenId),
            logicAddress: logicAddress[tokenId],
            lastActionTimestamp: lastActionTimestamp[tokenId]
        });
    }

    /// @inheritdoc IBAP578
    function getAgentMetadata(uint256 tokenId) external view returns (AgentMetadata memory) {
        _requireOwned(tokenId);
        return AgentMetadata({
            persona: persona[tokenId],
            experience: experience[tokenId],
            voiceHash: voiceHash[tokenId],
            animationURI: animationURI[tokenId],
            vaultURI: vaultURI[tokenId],
            vaultHash: vaultHash[tokenId]
        });
    }

    /// @inheritdoc IBAP578
    function updateAgentMetadata(uint256 tokenId, AgentMetadata calldata metadata) external {
        address tokenOwner = ownerOf(tokenId);
        if (msg.sender != tokenOwner && !isGameMaster[msg.sender] && msg.sender != owner()) revert NotTokenOwner();

        persona[tokenId] = metadata.persona;
        experience[tokenId] = metadata.experience;
        voiceHash[tokenId] = metadata.voiceHash;
        animationURI[tokenId] = metadata.animationURI;
        vaultURI[tokenId] = metadata.vaultURI;
        vaultHash[tokenId] = metadata.vaultHash;

        emit MetadataUpdated(tokenId);
    }

    /// @notice Pause a specific agent (BAP-578 per-token pause)
    function pause(uint256 tokenId) external onlyTokenOwner(tokenId) {
        if (agentStatus[tokenId] != Status.Active) revert AgentNotActive();
        agentStatus[tokenId] = Status.Paused;
        emit StatusChanged(tokenId, Status.Paused);
    }

    /// @notice Unpause a specific agent (BAP-578 per-token unpause)
    function unpause(uint256 tokenId) external onlyTokenOwner(tokenId) {
        if (agentStatus[tokenId] != Status.Paused) revert AgentNotPaused();
        agentStatus[tokenId] = Status.Active;
        emit StatusChanged(tokenId, Status.Active);
    }

    /// @inheritdoc IBAP578
    function terminate(uint256 tokenId) external onlyTokenOwner(tokenId) nonReentrant {
        if (agentStatus[tokenId] == Status.Terminated) revert AgentTerminated();
        agentStatus[tokenId] = Status.Terminated;
        emit StatusChanged(tokenId, Status.Terminated);

        // Refund agent balance to owner
        uint256 bal = agentBalance[tokenId];
        if (bal > 0) {
            agentBalance[tokenId] = 0;
            totalAgentBalance -= bal;
            (bool ok, ) = msg.sender.call{value: bal}("");
            require(ok);
        }
    }

    // ============ View Functions ============

    function isEligible(uint256 tokenId) external view returns (bool) {
        address tokenOwner = _ownerOf(tokenId);
        return tokenOwner != address(0) && agentStatus[tokenId] == Status.Active;
    }

    function getTraits(uint256 tokenId) external view returns (AgentTraits memory) {
        _requireOwned(tokenId);
        return traits[tokenId];
    }

    function getStats(uint256 tokenId) external view returns (AgentStats memory) {
        _requireOwned(tokenId);
        return stats[tokenId];
    }

    function getLevel(uint256 tokenId) external view returns (uint8) {
        _requireOwned(tokenId);
        return stats[tokenId].level;
    }

    /**
     * @notice Get the tier for a given level
     * @return 0 = Bronze (1-7), 1 = Silver (8-14), 2 = Gold (15-20)
     */
    function getTier(uint256 tokenId) external view returns (uint8) {
        _requireOwned(tokenId);
        uint8 level = stats[tokenId].level;
        if (level <= 7) return 0;  // Bronze
        if (level <= 14) return 1; // Silver
        return 2;                   // Gold
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter - 1;
    }

    // ============ Metadata (BAP-578) ============

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        require(address(metadataRenderer) != address(0), "Renderer not set");
        return metadataRenderer.constructTokenURI(tokenId);
    }

    // ============ ERC-165 ============

    function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
        return interfaceId == type(IBAP578).interfaceId || super.supportsInterface(interfaceId);
    }

    // ============ Receive ============

    receive() external payable {}
}
