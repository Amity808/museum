// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import {Museum} from "./Museum.sol";

contract MuseumFactory {

    error Invalid_Index(); 
    error Deployment_Failed();
    error Only_Admin();

    event MusuemDeployed(address indexed, address index);
    event MuseumStructEvent(string, string, address);

// create storage for school and location with unique name

struct MuseumStruct {
    string name;
    string location;
    address deployed;
}

// use 2d mapping
    mapping(uint256 => mapping(address => address)) public _addressDeployed;
    mapping(uint256 => address) public deployedAddress;
    mapping(uint256 => MuseumStruct) public _deployed;
    mapping(address => address) public deployedAddressR;

    address admin;
    uint256 public deploymentCount;

     modifier getDeploymentCount(uint256 index) {
        if (index > deploymentCount) revert Invalid_Index();
        _;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert Only_Admin();
        _;
    }


    function deployMuseum(uint256 _fee,
        address _token, string memory _name, string memory _location
        ) external returns(address museum) {
        // bytes memory bytecode = type(Museum).creationCode;
        bytes memory bytecode = abi.encodePacked(
            type(Museum).creationCode, abi.encode(_fee, _token, msg.sender)
        );
        bytes32 salt = bytes32(deploymentCount);
        assembly {
            museum := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
     

        if (address(museum) == address(0)) revert Deployment_Failed();
        Museum(museum).setDeployedAddress(address(museum));
        deployedAddress[deploymentCount] = address(museum);
        _deployed[deploymentCount] = MuseumStruct(_name, _location, address(museum));
        _addressDeployed[deploymentCount][msg.sender] = address(museum);
        deployedAddressR[msg.sender] = address(museum);
        deploymentCount++;

        emit MusuemDeployed(museum, msg.sender);
    }
}
