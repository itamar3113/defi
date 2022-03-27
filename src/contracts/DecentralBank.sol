pragma solidity ^0.5.0;

import './Rwd.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Rwd public rwd;


constructor(Rwd _rwd, Tether _tether) public {
    rwd = _rwd;
    tether = _tether;
}
}