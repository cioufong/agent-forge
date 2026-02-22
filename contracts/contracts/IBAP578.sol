// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/**
 * @title IBAP578 - Non-Fungible Agent Standard
 * @notice Interface for BAP-578 compliant agent NFTs on nfascan.net
 */
interface IBAP578 {

    // ============ Enums ============

    enum Status { Active, Paused, Terminated }

    // ============ Structs ============

    struct State {
        uint256 balance;
        Status status;
        address owner;
        address logicAddress;
        uint256 lastActionTimestamp;
    }

    struct AgentMetadata {
        string persona;
        string experience;
        string voiceHash;
        string animationURI;
        string vaultURI;
        bytes32 vaultHash;
    }

    // ============ Events ============

    event ActionExecuted(uint256 indexed tokenId, address indexed logicAddress, bytes data);
    event LogicUpgraded(uint256 indexed tokenId, address indexed newLogic);
    event AgentFunded(uint256 indexed tokenId, address indexed funder, uint256 amount);
    event StatusChanged(uint256 indexed tokenId, Status newStatus);
    event MetadataUpdated(uint256 indexed tokenId);

    // ============ Functions ============

    function executeAction(uint256 tokenId, bytes calldata data) external returns (bytes memory);
    function setLogicAddress(uint256 tokenId, address logic) external;
    function fundAgent(uint256 tokenId) external payable;
    function getState(uint256 tokenId) external view returns (State memory);
    function getAgentMetadata(uint256 tokenId) external view returns (AgentMetadata memory);
    function updateAgentMetadata(uint256 tokenId, AgentMetadata calldata metadata) external;
    function pause(uint256 tokenId) external;
    function unpause(uint256 tokenId) external;
    function terminate(uint256 tokenId) external;
}
