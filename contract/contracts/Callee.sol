pragma solidity ^0.4.21;
import './AnotherCallee.sol';

contract Callee{
    event logMessage(string indexed message);
    mapping (uint256 => uint256) balances;
    uint256 count = 0;
    AnotherCallee bob;
    constructor(address bobAddress) public{
        bob = AnotherCallee(bobAddress);
    }
    function checkAndWrite() public{
        write();
        check();
    }
    function write() public{
        balances[count] = 100;
        count += 1;
    }
    function check() public
    returns (bool)
    {
        if (msg.sender != address(0x0)){
            return true;
        }
        else
            return false;
    }
    function pong() public{
        bob.pang();
    }
}