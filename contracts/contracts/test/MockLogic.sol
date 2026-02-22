// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @notice Mock logic contract for testing AgentNFA.executeAction
contract MockLogic {
    uint256 public lastValue;

    function doSomething(uint256 value) external returns (uint256) {
        lastValue = value;
        return value * 2;
    }

    function alwaysRevert() external pure {
        revert("MockLogic: intentional revert");
    }
}
