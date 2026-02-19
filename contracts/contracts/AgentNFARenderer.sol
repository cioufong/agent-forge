// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IMetadataRenderer.sol";
import "./AgentNFA.sol";

/**
 * @title AgentNFARenderer
 * @notice On-chain metadata renderer for AgentForge NFA tokens
 */
contract AgentNFARenderer is IMetadataRenderer {
    using Strings for uint256;
    using Strings for uint8;

    AgentNFA public immutable agentNFA;

    string[3] private _specializationNames;
    string[5] private _rarityNames;
    string[3] private _tierNames;

    constructor(address _agentNFA) {
        agentNFA = AgentNFA(_agentNFA);

        _specializationNames[0] = "Math";
        _specializationNames[1] = "Code";
        _specializationNames[2] = "Trivia";

        _rarityNames[0] = "Common";
        _rarityNames[1] = "Rare";
        _rarityNames[2] = "Epic";
        _rarityNames[3] = "Legendary";
        _rarityNames[4] = "Mythic";

        _tierNames[0] = "Bronze";
        _tierNames[1] = "Silver";
        _tierNames[2] = "Gold";
    }

    function constructTokenURI(uint256 tokenId) external view override returns (string memory) {
        AgentNFA.AgentTraits memory t = agentNFA.getTraits(tokenId);
        AgentNFA.AgentStats memory s = agentNFA.getStats(tokenId);
        uint8 tier = agentNFA.getTier(tokenId);
        string memory exp = agentNFA.experience(tokenId);

        // Build SVG
        string memory svg = _buildSVG(tokenId, t, s, tier);

        // Build JSON metadata
        string memory json = string(abi.encodePacked(
            '{"name":"Agent #', tokenId.toString(),
            '","description":"AgentForge NFA - AI Agent Identity",',
            '"image":"data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '",',
            '"attributes":[',
            _buildAttributes(t, s, tier, exp),
            ']}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(bytes(json))
        ));
    }

    function _buildSVG(
        uint256 tokenId,
        AgentNFA.AgentTraits memory t,
        AgentNFA.AgentStats memory s,
        uint8 tier
    ) internal view returns (string memory) {
        string memory bgColor;
        if (tier == 0) bgColor = "#CD7F32"; // Bronze
        else if (tier == 1) bgColor = "#C0C0C0"; // Silver
        else bgColor = "#FFD700"; // Gold

        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">',
            '<rect width="400" height="400" fill="#1a1a2e"/>',
            '<rect x="10" y="10" width="380" height="380" rx="20" fill="none" stroke="', bgColor, '" stroke-width="3"/>',
            '<text x="200" y="50" fill="', bgColor, '" font-size="24" text-anchor="middle" font-family="monospace">Agent #', tokenId.toString(), '</text>',
            '<text x="200" y="90" fill="#eee" font-size="16" text-anchor="middle" font-family="monospace">Lv.', uint256(s.level).toString(), ' ', _tierNames[tier], '</text>',
            '<text x="40" y="140" fill="#aaa" font-size="14" font-family="monospace">INT: ', uint256(t.intelligence).toString(), '</text>',
            '<text x="40" y="170" fill="#aaa" font-size="14" font-family="monospace">SPD: ', uint256(t.speed).toString(), '</text>',
            '<text x="40" y="200" fill="#aaa" font-size="14" font-family="monospace">Spec: ', _specializationNames[uint8(t.specialization)], '</text>',
            '<text x="40" y="230" fill="#aaa" font-size="14" font-family="monospace">Talent: ', _rarityNames[uint8(t.talentRarity)], '</text>',
            '<text x="40" y="280" fill="#888" font-size="12" font-family="monospace">XP: ', uint256(s.xp).toString(), '</text>',
            '<text x="40" y="310" fill="#888" font-size="12" font-family="monospace">Solved: ', uint256(s.problemsSolved).toString(), '/', uint256(s.problemsAttempted).toString(), '</text>',
            '</svg>'
        ));
    }

    function _buildAttributes(
        AgentNFA.AgentTraits memory t,
        AgentNFA.AgentStats memory s,
        uint8 tier,
        string memory exp
    ) internal view returns (string memory) {
        return string(abi.encodePacked(
            '{"trait_type":"Intelligence","value":', uint256(t.intelligence).toString(), '},',
            '{"trait_type":"Speed","value":', uint256(t.speed).toString(), '},',
            '{"trait_type":"Specialization","value":"', _specializationNames[uint8(t.specialization)], '"},',
            '{"trait_type":"Talent Rarity","value":"', _rarityNames[uint8(t.talentRarity)], '"},',
            '{"trait_type":"Level","value":', uint256(s.level).toString(), '},',
            '{"trait_type":"Tier","value":"', _tierNames[tier], '"},',
            '{"trait_type":"XP","value":', uint256(s.xp).toString(), '},',
            '{"trait_type":"Experience","value":"', exp, '"}'
        ));
    }
}
