// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {ConsensysPoC} from "../src/ConsensysPoC.sol";

contract ConsensysPoCScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployer = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployer);

        ConsensysPoC consensysPoC = new ConsensysPoC();
        console2.log("Deployed ConsensysPoC at:", address(consensysPoC));

        vm.stopBroadcast();
    }
}
