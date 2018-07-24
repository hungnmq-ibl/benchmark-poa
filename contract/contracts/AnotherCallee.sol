pragma solidity ^0.4.21;

contract AnotherCallee{
    event logMessage(string indexed message);
    mapping (uint256 => uint256) balances;
    uint256 count = 0;
    function pang() public{
        require (msg.sender != address(0x0));
        balances[count] = 100;
        count += 1;
        emit logMessage("this is AnotherCallee pang");
    }
}