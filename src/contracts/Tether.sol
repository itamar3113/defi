pragma solidity ^0.5.5;

contract Tether {
    string public name = "Tether";
    string public symbol = "USDT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address owner, address spender, uint256 value);

    mapping(address => uint256) public balanceOf;
     mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function approve

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success){
        require(balanceOf[from] >= value);
         require(allowance[msg.sender][from] >= value);
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[msg.sender][from] -= value;
        emit Transfer(from, to, value);
    }
}
