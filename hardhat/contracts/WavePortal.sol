// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract WavePortal {
    struct Wave {
        address userAddress;
        string message;
        uint256 timestamp;
    }

    event NewWave(address indexed from, uint256 timestamp, string message);

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    function wave(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 3 minutes < block.timestamp,
            "Wait 3 minutes"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getWaveMessages() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return waves.length;
    }
}
