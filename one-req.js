var request = require('request');
var Web3 = require('web3');


var NUM_TX = 100000;
var VALUE = 10;
var RECEIVER = '0x48d7f33af19816c9867cfa71b3404f9b9ac269e8';
var DELAY = 1000;
var COUNT = 50;



var mode = 0;

const SERVER_1 = '45.79.1.133';
const SERVER_2 = '45.79.65.140';
const SERVER_3 = '139.162.231.105';
const SERVER_4 = '139.162.72.128';
const SERVER_5 = '139.162.14.28'
const SERVER_6 = '45.79.9.18'
const SERVER_7 = '139.162.53.247'
const SERVER_8 = '172.104.116.45'
const SERVER_9 = '45.79.70.92'
const SERVER_10 = '178.79.184.253'

const FORWARDER_1 = '172.104.55.215';
const FORWARDER_2 = '139.162.4.68';
const FORWARDER_3 = '172.104.55.166';
const FORWARDER_4 = '139.162.4.168';
const FORWARDER_5 = '45.118.132.99';
// const FORWARDER_6 = '172.104.168.130';
const FORWARDER_7 = '139.162.52.30';
const FORWARDER_8 = '172.104.191.159';
const FORWARDER_9 = '139.162.32.4';
const FORWARDER_10 = '172.104.171.253';

console.log("GROUP A =============================================");

request(`http://${FORWARDER_1}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_1, function (error, response, body) {
    console.log('\nFORWARDER_1: ', FORWARDER_1);
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});

// var RECEIVER2 = '0x9317411384a505f01229859cd7e9ea76365ec7d0';
// request(`http://${FORWARDER_2}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER2 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_2, function (error, response, body) {
//     console.log('\nFORWARDER_2: ', FORWARDER_2);
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// var RECEIVER3 = '0x2f0036792df25362a2de0bab82b4798657b4bc36';
// request(`http://${FORWARDER_3}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER3 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_3, function (error, response, body) {
//     console.log('\nFORWARDER_3: ', FORWARDER_3);;
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// var RECEIVER4 = '0xc4c7fc58b37be1b4f2a6230cace76afd47cff748';
// request(`http://${FORWARDER_4}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER4 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_4, function (error, response, body) {
//     console.log('\nFORWARDER_4: ', FORWARDER_5);
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });


// var RECEIVER5 = '0xb4b4f921eb4e6fde7a0a0cff44ca21e4edf12a1c';
// request(`http://${FORWARDER_5}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER5 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_5, function (error, response, body) {
//     console.log('\nFORWARDER_5: ', FORWARDER_5);
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// var RECEIVER6 = '0xa7f349eb9c14a7d77a52fd5d4a2a86c6aa09905f';
// request(`http://${FORWARDER_9}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER6 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_6, function (error, response, body) {
//     console.log('\nFORWARDER_9: ', FORWARDER_9);
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// var RECEIVER7 = '0xaf412ac07402248428ec88a6a065fdbfd2f65a37';
// request(`http://${FORWARDER_7}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER7 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_7, function (error, response, body) {
//     console.log('\nFORWARDER_7: ', FORWARDER_7);
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// var RECEIVER8 = '0xaca7fca19500e8ea99255d57dbde895404f8ea7d';
// request(`http://${FORWARDER_8}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER8 + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_8, function (error, response, body) {
//     console.log('\nFORWARDER_8: ', FORWARDER_8);
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });