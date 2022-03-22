pragma solidity ^0.5.0;

contract Migrations{
    address public owner;
    uint public last_complited_migration;

    constructor() public{
        owner = msg.sender;
    }

    modifier restricted() {
        if(msg.sender == owner) _;
    }

    function setCompleted(uint complited) public restricted {
             last_complited_migration = complited;
    }

    function upgrade(address newAddress) public restricted {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(last_complited_migration);
    }
}