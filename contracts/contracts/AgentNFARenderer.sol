// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IMetadataRenderer.sol";
import "./AgentNFA.sol";

/**
 * @title AgentNFARenderer
 * @notice On-chain SVG renderer – energy orb style
 *         Color by specialization, complexity by rarity, frame by tier
 */
contract AgentNFARenderer is IMetadataRenderer {
    using Strings for uint256;
    using Strings for uint8;

    AgentNFA public immutable agentNFA;

    // Name arrays
    string[3] private _specNames;
    string[5] private _rarityNames;
    string[3] private _tierNames;

    // Spec colors: [Math, Code, Trivia]
    string[3] private _mainColor;
    string[3] private _lightColor;
    string[3] private _darkColor;
    string[3] private _bgColor;
    string[3] private _tierColor;

    // Spec symbols (XML-escaped for SVG)
    string[3] private _specSymbol;
    string[3] private _specSymbolSize;
    string[3] private _specSymbolFont;

    constructor(address _agentNFA) {
        agentNFA = AgentNFA(payable(_agentNFA));

        _specNames[0] = "Math";
        _specNames[1] = "Code";
        _specNames[2] = "Trivia";

        _rarityNames[0] = "Common";
        _rarityNames[1] = "Rare";
        _rarityNames[2] = "Epic";
        _rarityNames[3] = "Legendary";
        _rarityNames[4] = "Mythic";

        _tierNames[0] = "Bronze";
        _tierNames[1] = "Silver";
        _tierNames[2] = "Gold";

        // Math = blue, Code = green, Trivia = purple
        _mainColor[0]  = "#4a8fe7"; _mainColor[1]  = "#2ecc71"; _mainColor[2]  = "#9b59b6";
        _lightColor[0] = "#8ec5fc"; _lightColor[1] = "#7dffb3"; _lightColor[2] = "#d4a5ff";
        _darkColor[0]  = "#1a3a7a"; _darkColor[1]  = "#0a6b2a"; _darkColor[2]  = "#4a1a6b";
        _bgColor[0]    = "#101020"; _bgColor[1]    = "#0a1a10"; _bgColor[2]    = "#140e20";

        _tierColor[0] = "#CD7F32"; // Bronze
        _tierColor[1] = "#C0C0C0"; // Silver
        _tierColor[2] = "#FFD700"; // Gold

        _specSymbol[0] = "&#x03A3;";    // Sigma
        _specSymbol[1] = "&lt;/&gt;";   // </>
        _specSymbol[2] = "&#x2734;";    // ✴

        _specSymbolSize[0] = "36";
        _specSymbolSize[1] = "28";
        _specSymbolSize[2] = "34";

        _specSymbolFont[0] = "serif";
        _specSymbolFont[1] = "monospace";
        _specSymbolFont[2] = "serif";
    }

    // ============ Public ============

    function constructTokenURI(uint256 tokenId) external view override returns (string memory) {
        AgentNFA.AgentTraits memory t = agentNFA.getTraits(tokenId);
        AgentNFA.AgentStats memory s = agentNFA.getStats(tokenId);
        uint8 tier = agentNFA.getTier(tokenId);
        string memory exp = agentNFA.experience(tokenId);

        string memory svg = _buildSVG(tokenId, t, s, tier);

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

    // ============ SVG Builder ============

    function _buildSVG(
        uint256 tokenId,
        AgentNFA.AgentTraits memory t,
        AgentNFA.AgentStats memory s,
        uint8 tier
    ) internal view returns (string memory) {
        uint8 spec = uint8(t.specialization);
        uint8 rarity = uint8(t.talentRarity);
        bool mythic = rarity == 4;

        return string(abi.encodePacked(
            _svgHead(spec, tier, mythic),
            _svgBody(spec, rarity, mythic),
            _svgFoot(tokenId, tier, spec, rarity, s.level, mythic)
        ));
    }

    // -- Head: defs + background + frame --

    function _svgHead(uint8 spec, uint8 tier, bool mythic) internal view returns (string memory) {
        string memory lc = mythic ? "#ffd4a5" : _lightColor[spec];
        string memory mc = mythic ? "#ff6b6b" : _mainColor[spec];
        string memory dc = mythic ? "#6b0a0a" : _darkColor[spec];
        string memory bg = mythic ? "#1a0a0a" : _bgColor[spec];
        string memory tc = _tierColor[tier];

        return string(abi.encodePacked(
            _svgDefs(lc, mc, dc),
            _svgBgAndFrame(bg, tc, tier, mythic)
        ));
    }

    function _svgDefs(
        string memory lc, string memory mc, string memory dc
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs>'
            '<radialGradient id="o" cx="40%" cy="35%" r="55%">'
            '<stop offset="0%" stop-color="', lc,
            '"/><stop offset="40%" stop-color="', mc,
            '"/><stop offset="100%" stop-color="', dc,
            '"/></radialGradient>'
            '<radialGradient id="h" cx="45%" cy="40%" r="40%">'
            '<stop offset="0%" stop-color="#fff" stop-opacity=".15"/>'
            '<stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>'
            '<filter id="g"><feGaussianBlur stdDeviation="3"/></filter>'
            '<filter id="g2"><feGaussianBlur stdDeviation="8"/></filter></defs>'
        ));
    }

    function _svgBgAndFrame(
        string memory bg, string memory tc, uint8 tier, bool mythic
    ) internal pure returns (string memory) {
        string memory s = string(abi.encodePacked(
            '<rect width="400" height="400" fill="', bg, '"/>'
        ));

        if (tier == 2) {
            // Gold: double frame
            s = string(abi.encodePacked(s,
                '<rect x="5" y="5" width="390" height="390" rx="16" fill="none" stroke="', tc,
                '" stroke-width="2.5" opacity=".7"/>'
                '<rect x="12" y="12" width="376" height="376" rx="12" fill="none" stroke="', tc,
                '" stroke-width=".8" opacity=".3"/>'
            ));
        } else if (tier == 1) {
            // Silver: frame + corner gems
            s = string(abi.encodePacked(s,
                '<rect x="6" y="6" width="388" height="388" rx="16" fill="none" stroke="', tc,
                '" stroke-width="2" opacity=".6"/>'
            ));
            s = string(abi.encodePacked(s,
                '<g fill="', tc, '" opacity=".4">'
                '<circle cx="20" cy="20" r="3"/><circle cx="380" cy="20" r="3"/>'
                '<circle cx="20" cy="380" r="3"/><circle cx="380" cy="380" r="3"/></g>'
            ));
        } else {
            // Bronze: simple frame
            s = string(abi.encodePacked(s,
                '<rect x="8" y="8" width="384" height="384" rx="16" fill="none" stroke="', tc,
                '" stroke-width="2" opacity=".5"/>'
            ));
        }

        if (mythic) {
            s = string(abi.encodePacked(s,
                '<g opacity=".04" stroke="#FFD700" fill="none" stroke-width="2">'
                '<path d="M0,80 Q100,120 200,80 Q300,40 400,80"/>'
                '<path d="M0,240 Q100,200 200,240 Q300,280 400,240"/>'
                '<path d="M0,320 Q100,280 200,320 Q300,360 400,320"/></g>'
            ));
        }

        return s;
    }

    // -- Body: aura + orb + orbits + particles --

    function _svgBody(uint8 spec, uint8 rarity, bool mythic) internal view returns (string memory) {
        string memory mc = mythic ? "#ff6b6b" : _mainColor[spec];
        string memory lc = mythic ? "#ffd4a5" : _lightColor[spec];

        return string(abi.encodePacked(
            _svgAuraAndOrb(mc, spec),
            _svgOrbits(mc, rarity),
            _svgParticles(lc, mc, rarity)
        ));
    }

    function _svgAuraAndOrb(string memory mc, uint8 spec) internal view returns (string memory) {
        string memory orb = string(abi.encodePacked(
            '<circle cx="200" cy="185" r="140" fill="', mc,
            '" opacity=".08" filter="url(#g2)"/>'
            '<circle cx="200" cy="185" r="75" fill="', mc,
            '" opacity=".12" filter="url(#g2)"/>'
            '<circle cx="200" cy="185" r="65" fill="url(#o)"/>'
            '<circle cx="200" cy="185" r="65" fill="url(#h)"/>'
            '<ellipse cx="182" cy="162" rx="28" ry="20" fill="#fff" opacity=".12"/>'
            '<ellipse cx="178" cy="158" rx="12" ry="8" fill="#fff" opacity=".2"/>'
        ));

        return string(abi.encodePacked(orb,
            '<text x="200" y="195" fill="#fff" font-size="', _specSymbolSize[spec],
            '" text-anchor="middle" font-family="', _specSymbolFont[spec],
            '" opacity=".5">', _specSymbol[spec], '</text>'
        ));
    }

    function _svgOrbits(string memory mc, uint8 rarity) internal pure returns (string memory) {
        // Always at least 1 orbit ring
        string memory s = string(abi.encodePacked(
            '<g fill="none" stroke="', mc, '" opacity=".25">'
            '<ellipse cx="200" cy="185" rx="120" ry="35" stroke-width=".8" transform="rotate(-20,200,185)"/>'
        ));
        if (rarity >= 2) {
            s = string(abi.encodePacked(s,
                '<ellipse cx="200" cy="185" rx="110" ry="40" stroke-width=".6" opacity=".8" transform="rotate(35,200,185)"/>'
            ));
        }
        if (rarity >= 3) {
            s = string(abi.encodePacked(s,
                '<ellipse cx="200" cy="185" rx="100" ry="32" stroke-width=".5" opacity=".6" transform="rotate(-55,200,185)"/>'
            ));
        }
        if (rarity >= 4) {
            s = string(abi.encodePacked(s,
                '<ellipse cx="200" cy="185" rx="90" ry="30" stroke-width=".5" opacity=".5" transform="rotate(75,200,185)"/>'
            ));
        }
        return string(abi.encodePacked(s, '</g>'));
    }

    function _svgParticles(string memory lc, string memory mc, uint8 rarity) internal pure returns (string memory) {
        // Particle 1: always present
        string memory s = string(abi.encodePacked(
            '<circle cx="310" cy="170" r="4" fill="', lc,
            '" filter="url(#g)" opacity=".7"/>'
            '<circle cx="310" cy="170" r="2" fill="#fff" opacity=".9"/>'
        ));
        if (rarity >= 1) {
            s = string(abi.encodePacked(s,
                '<circle cx="82" cy="160" r="5" fill="', mc,
                '" filter="url(#g)" opacity=".6"/>'
                '<circle cx="82" cy="160" r="2.5" fill="#fff" opacity=".8"/>'
            ));
        }
        if (rarity >= 2) {
            s = string(abi.encodePacked(s,
                '<circle cx="220" cy="75" r="4" fill="', lc,
                '" filter="url(#g)" opacity=".7"/>'
                '<circle cx="220" cy="75" r="2" fill="#fff" opacity=".9"/>'
            ));
        }
        if (rarity >= 3) {
            s = string(abi.encodePacked(s,
                '<circle cx="130" cy="285" r="4.5" fill="', mc,
                '" filter="url(#g)" opacity=".6"/>'
                '<circle cx="130" cy="285" r="2" fill="#fff" opacity=".8"/>'
            ));
        }
        if (rarity >= 4) {
            s = string(abi.encodePacked(s,
                '<circle cx="290" cy="90" r="5" fill="', lc,
                '" filter="url(#g)" opacity=".5"/>'
                '<circle cx="290" cy="90" r="2" fill="#fff" opacity=".8"/>'
            ));
        }
        return s;
    }

    // -- Foot: reflection + crown + label --

    function _svgFoot(
        uint256 tokenId, uint8 tier, uint8 spec, uint8 rarity, uint8 level, bool mythic
    ) internal view returns (string memory) {
        string memory mc = mythic ? "#ff6b6b" : _mainColor[spec];

        string memory extras = string(abi.encodePacked(
            '<ellipse cx="200" cy="310" rx="60" ry="8" fill="', mc, '" opacity=".06" filter="url(#g2)"/>',
            mythic
                ? '<g opacity=".5"><polygon points="176,100 182,82 192,96 200,72 208,96 218,82 224,100" fill="none" stroke="#FFD700" stroke-width="1.5"/>'
                  '<circle cx="200" cy="72" r="3" fill="#FFD700"/></g>'
                : ""
        ));

        return string(abi.encodePacked(
            extras,
            _svgLabel(tokenId, tier, spec, rarity, level)
        ));
    }

    function _svgLabel(
        uint256 tokenId, uint8 tier, uint8 spec, uint8 rarity, uint8 level
    ) internal view returns (string memory) {
        string memory tc = _tierColor[tier];

        string memory line1 = string(abi.encodePacked(
            '<text x="200" y="350" fill="', tc,
            '" font-size="15" text-anchor="middle" font-family="monospace" font-weight="bold">Agent #',
            tokenId.toString(), '</text>'
        ));

        string memory info = string(abi.encodePacked(
            'Lv.', uint256(level).toString(), ' ', _tierNames[tier]
        ));
        info = string(abi.encodePacked(
            info, ' | ', _specNames[spec], ' | ', _rarityNames[rarity]
        ));

        return string(abi.encodePacked(
            line1,
            '<text x="200" y="370" fill="#556" font-size="10" text-anchor="middle" font-family="monospace">',
            info, '</text></svg>'
        ));
    }

    // ============ JSON Attributes ============

    function _buildAttributes(
        AgentNFA.AgentTraits memory t,
        AgentNFA.AgentStats memory s,
        uint8 tier,
        string memory exp
    ) internal view returns (string memory) {
        return string(abi.encodePacked(
            '{"trait_type":"Intelligence","value":', uint256(t.intelligence).toString(), '},',
            '{"trait_type":"Speed","value":', uint256(t.speed).toString(), '},',
            '{"trait_type":"Specialization","value":"', _specNames[uint8(t.specialization)], '"},',
            '{"trait_type":"Talent Rarity","value":"', _rarityNames[uint8(t.talentRarity)], '"},',
            '{"trait_type":"Level","value":', uint256(s.level).toString(), '},',
            '{"trait_type":"Tier","value":"', _tierNames[tier], '"},',
            '{"trait_type":"XP","value":', uint256(s.xp).toString(), '},',
            '{"trait_type":"Experience","value":"', exp, '"}'
        ));
    }
}
