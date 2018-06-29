var request = require('request');
var Web3 = require('web3');


var NUM_TX = 1;
var VALUE = 10;
var RECEIVER = '0x48d7f33af19816c9867cfa71b3404f9b9ac269e8';
var DELAY = 1000;
var COUNT = 1;



var mode = 0;

const SERVER_1 = 'localhost';
const FORWARDER_1 = 'localhost';

console.log("GROUP A =============================================");

request(`http://${FORWARDER_1}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_1, function (error, response, body) {
    console.log('\nFORWARDER_1: ', FORWARDER_1);
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});

