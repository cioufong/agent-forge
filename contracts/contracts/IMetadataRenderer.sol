// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

interface IMetadataRenderer {
    function constructTokenURI(
        uint256 tokenId
    ) external view returns (string memory);
}
