var request = require('request');
var Web3 = require('web3');


var NUM_TX = 1000;
var VALUE = 10;
var RECEIVER = '0x48d7f33af19816c9867cfa71b3404f9b9ac269e8';
var DELAY = 1000;
var COUNT = 1000;
var SLEEP_TIME = 1000// * 4;//60s



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

const FORWARDER_ARRAY = [FORWARDER_1, FORWARDER_2, FORWARDER_3, FORWARDER_4]
const SERVER_ARRAY = [SERVER_1, SERVER_2, SERVER_3, SERVER_4]

var forwarderIndex = 0;
console.log("GROUP A =============================================");




sendRequest(function () {
    setInterval(function () {
        sendRequest(function(){
            console.log('');
        })
    }, SLEEP_TIME)
})

function sendRequest(cb) {
    request(`http://${FORWARDER_ARRAY[forwarderIndex]}:7777?numTx=` + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_ARRAY[forwarderIndex], function (error, response, body) {
        console.log('\nFORWARDER_1: ', FORWARDER_ARRAY[forwarderIndex]);
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        forwarderIndex++;
        if (forwarderIndex >= FORWARDER_ARRAY.length) {
            forwarderIndex = 0;
        }
    });

    cb()
}