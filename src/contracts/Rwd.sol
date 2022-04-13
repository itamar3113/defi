pragma solidity ^0.5.5;

contract Rwd {
    string public name = "Reward Token";
    string public symbol = "RWD";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address owner, address spender, uint256 value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function approve(address spender, uint256 value) public returns (bool success){
         allowance[msg.sender][spender] = value;
         emit Approval(msg.sender, spender, value);
         return true;
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success){
        require(balanceOf[from] >= value);
        //check this!!
         require(allowance[from][msg.sender] >= value);
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}