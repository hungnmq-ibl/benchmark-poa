var request = require('request');
var Web3 = require('web3');


var NUM_TX = 2000;
var VALUE = 10;
var RECEIVER = '0x48d7f33af19816c9867cfa71b3404f9b9ac269e8';
var DELAY = 1000;
var COUNT = 100;

var mode = 0;
const SERVER_1 = '45.79.8.29'
// const SERVER_1 = '45.79.7.89';
// const SERVER_2 = '45.79.197.186';
// const SERVER_3 = '45.79.173.76';
// const SERVER_4 = '109.74.203.174';
// const SERVER_5 = '139.162.157.74';
// const SERVER_6 = '139.162.13.239';
// const SERVER_7 = '139.162.118.123';
// const SERVER_8 = '139.162.70.215';

// const SERVER = "139.162.37.116";
// const SERVER = "139.162.49.38";
// const SERVER = "139.162.8.24";
// const SERVER = "45.79.1.133";

// var web3 = new Web3(new Web3.providers.HttpProvider("http://" + SERVER + ":8545"));

// web3.eth.getBlockNumber(function (error, blockNumber) {
//     console.log('\nBlock Number', blockNumber);


console.log("GROUP A =============================================");

request('http://172.104.55.215:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_1, function (error, response, body) {
    console.log('\n172.104.55.215');
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});

// request('http://139.162.4.68:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_2, function (error, response, body) {
//     console.log('\n139.162.4.68');
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// request('http://172.104.55.166:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_3, function (error, response, body) {
//     console.log('\n172.104.55.166');
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// request('http://139.162.4.168:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_4, function (error, response, body) {
//     console.log('\n139.162.4.168');
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// request('http://45.118.132.99:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_5, function (error, response, body) {
//     console.log('\n45.118.132.99');
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

mode = 1;

setInterval(function () {
    if (mode == 0) {
        console.log("GROUP A =============================================");

        request('http://172.104.55.215:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_1, function (error, response, body) {
            console.log('\n172.104.55.215');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        request('http://139.162.4.68:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_2, function (error, response, body) {
            console.log('\n139.162.4.68');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        request('http://172.104.55.166:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_3, function (error, response, body) {
            console.log('\n172.104.55.166');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        request('http://139.162.4.168:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_4, function (error, response, body) {
            console.log('\n139.162.4.168');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        // request('http://45.118.132.99:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_5, function (error, response, body) {
        //     console.log('\n45.118.132.99');
        //     console.log('error:', error);
        //     console.log('statusCode:', response && response.statusCode);
        //     console.log('body:', body);
        // });

        mode = 1;

    } else {
        console.log("GROUP B =============================================");

        request('http://172.104.168.130:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_5, function (error, response, body) {
            console.log('\n172.104.168.130');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        request('http://139.162.52.30:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_6, function (error, response, body) {
            console.log('\n139.162.52.30');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        request('http://172.104.191.159:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_7, function (error, response, body) {
            console.log('\n172.104.191.159');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        request('http://139.162.32.4:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_8, function (error, response, body) {
            console.log('\n139.162.32.4');
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });

        // request('http://172.104.171.253:7777?numTx=' + NUM_TX + '&value=' + VALUE + '&receiver=' + RECEIVER + '&delay=' + DELAY + '&count=' + COUNT + '&server=' + SERVER_10, function (error, response, body) {
        //     console.log('\n172.104.171.253');
        //     console.log('error:', error);
        //     console.log('statusCode:', response && response.statusCode);
        //     console.log('body:', body);
        // });

        mode = 0
    }

}, 30000);

// })