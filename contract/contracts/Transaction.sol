pragma solidity ^0.4.21;
import './Callee.sol';

contract Transaction{
    mapping (uint256 => uint256) balances;
    Callee alice;
    event log(bytes32 indexed message);
    constructor(address calleeAddress) public{
        alice = Callee(calleeAddress);
    }
    function core(uint8 calculateTimes, uint8 memoryTimes, uint8 storageTimes, uint8 checkTimes, uint8 writeTimes, uint8 checkAndWriteTimes)
    internal
    {
        uint8[20] memory mStore;
        uint8 calVar = 0;
        for(uint8 i = 0; i < calculateTimes; i++){
            calVar = i + 1;
            calVar = i - 1;
            calVar = i * 1;
            calVar = i / 1;
        }
        // 1 Mstore, 1 Mload
        for(i = 0; i < memoryTimes; i++){
            mStore[i] = i + 10;
            mStore[i] *= 2;
        }
        // 1 SStore, 1Sload
        for(i = 0; i < storageTimes; i++){
            bool condition = balances[i] == 0;
            if(condition){}
            balances[i] = i;
            balances[i] = i + 1;
        }
        // only check condtion
        for(i = 0; i < checkTimes; i++){
            alice.check();
        }
        // 
        for(i = 0; i < writeTimes; i++){
            alice.write();
        }
        for(i = 0; i < checkAndWriteTimes; i++){
            alice.checkAndWrite();
        }
    }
    function lightTransaction() public{
        uint8 calculateTimes = 5;
        uint8 memoryTimes = 5;
        uint8 storageTimes = 1;
        uint8 checkTimes = 0;
        uint8 writeTimes = 0;
        uint8 checkAndWriteTimes = 0;
        core(calculateTimes, memoryTimes, storageTimes, checkTimes, writeTimes, checkAndWriteTimes);
    
    }
    function mediumTransaction()  public{
        uint8 calculateTimes = 5; 
        uint8 memoryTimes = 5;
        uint8 storageTimes = 0;
        uint8 checkTimes = 1;
        uint8 writeTimes = 1;
        uint8 checkAndWriteTimes = 0;
        core(calculateTimes, memoryTimes, storageTimes, checkTimes, writeTimes, checkAndWriteTimes);
    }
    function hardTransaction()  public{
    }
}