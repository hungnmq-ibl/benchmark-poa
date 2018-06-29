

const FORWARDER_1 = '139.162.12.114'
const FORWARDER_2 = '172.104.92.139'
const FORWARDER_3 = '139.162.57.14'
const FORWARDER_4 = '139.162.2.124'
const FORWARDER_5 = '139.162.66.39'
const FORWARDER_6 = '172.104.102.133'
const FORWARDER_7 = '139.162.84.23'
const FORWARDER_8 = '172.104.191.106'
const FORWARDER_9 = '45.79.2.22'
const FORWARDER_10 = '45.79.66.149'

// Forwarder is server run app.js

var FORWARDERS = [
    '139.162.12.114',
    '172.104.92.139',
    '139.162.57.14',
    '139.162.2.124',
    '139.162.66.39',
    '172.104.102.133',
    '139.162.84.23',
    '172.104.191.106',
    '45.79.2.22',
    '45.79.66.149',
]

var minerServer = [
    '139.162.103.203',
    '139.162.82.243',
    '139.162.102.203',
    '172.104.72.191',
    '172.104.104.112',
    '172.105.200.91',
    '139.162.118.123',
    '139.162.70.215'
]

const SENDING_NUMBER = 2; // Number of tx send by seconds

const NEW_ADDR_NUM = 2; // Number of new address
const TOTAL_CREATE_TX = 2; // Total transaction create from 1 address
const SPREAD_VALUE = 1e18/2; // Number of wei send to new address 
const SENDING_VALUE = 1; // Number of wei send from new address

var sender = require('./account-send')
var receiver = require('./account-receive')
var fullNodeIp = require('./fullnode-ip').ip;

var info = []

// fullNodeIp = ['localhost']
// FORWARDERS = ['localhost']
// minerServer = ['localhost']

var eachForwarderWillHandle = fullNodeIp.length / FORWARDERS.length;
var list = [];
var fullNodeIndex = 0;
for (var i = 0; i < FORWARDERS.length; i++) {
    console.log(fullNodeIndex, eachForwarderWillHandle + fullNodeIndex);
    var info = {
        forwarderIp: FORWARDERS[i],
        fullNodeIp: fullNodeIp.slice(fullNodeIndex, eachForwarderWillHandle + fullNodeIndex),//, SERVER_6, SERVER_7, SERVER_8, SERVER_9, SERVER_10],
        senderAddress: sender.addresses.slice(fullNodeIndex, eachForwarderWillHandle + fullNodeIndex),
        senderPrivateKey: sender.privateKey.slice(fullNodeIndex, eachForwarderWillHandle + fullNodeIndex),
        receiverAddress: receiver.addresses.slice(fullNodeIndex, eachForwarderWillHandle + fullNodeIndex),
        totalTxCreate: TOTAL_CREATE_TX,
        sendingNumber: SENDING_NUMBER,
        newAddrNum: NEW_ADDR_NUM,
        spreadValue: SPREAD_VALUE,
        sendingValue: SENDING_VALUE,
        minerServer: minerServer
    }
    list.push(info)

    fullNodeIndex += eachForwarderWillHandle;
}

// console.log(list);

module.exports = {
    info: list
}
