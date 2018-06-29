var request = require('request');
var async = require('async')

var url = `http://45.79.1.133:8545/`
// var url = `http://139.162.231.105:8545/`
var startTime = new Date().getTime();




var express = require('express');
var app = express();
var ethTx = require('ethereumjs-tx');
var Web3 = require('web3');

const PUBLIC_ADDR = "5114cE2D7577aE4f68D5eAEF603D269Adf1eED73";
const PRIVATE_ADDR = "3472f8748fc86f850fefac4aaa0128eac21833b7b701947bdea8e9ad6c554b19";

var SERVER = 'http://139.162.117.70:6969/api/logs';
var FULLNODE_SERVER = 'http://localhost:8546'
var FULLNODE_SERVER = 'http://45.79.65.140:8545'

var nonceWeb3 = new Web3(new Web3.providers.HttpProvider(FULLNODE_SERVER));

nonceWeb3.eth.getTransactionCount(PUBLIC_ADDR, 'latest', function (error, nonce) {
    console.log("nonce" ,nonce.toString(16));// return
    var arr = [];
    var numTx = 100;
    var value = 1;
    var receiver = '0x8b1a1ad5957573925a8273f449a9283b6f369181';
    var delay = 1000;
    var count = 10;

    for (var i = 0; i < numTx; i++) {
        // console.log(nonce);

        var txParams = {
            nonce: '0x' + nonce.toString(16),
            gasPrice: '0x200B20',
            gasLimit: '0xF4240',
            to: receiver,
            value: '0x1'
        };

        // console.log(txParams);

        // Transaction is created
        var tx = new ethTx(txParams);
        var privKey = Buffer.from(PRIVATE_ADDR, 'hex');

        // Transaction is signed
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        var rawTx = '0x' + serializedTx.toString('hex');

        arr.push(rawTx);
        nonce++;
    }
    // async.eachSeries(arr, (tx, next) => {
    //     sendTx(tx, (err, rs) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         console.log(rs);
    //         next()
    //     })
    // }, () => {
    //     console.log('Done');
    // })
    var refreshIntervalId = setInterval(function () {
        for (var i = 0; i < count; i++) {
            if (arr.length == 0) {
                clearInterval(refreshIntervalId);
                break;
            }
            sendTx(arr.shift(), (err, rs) => {
                if (err) {
                    console.log(err);
                }
                console.log(rs);
            })

        }
    }, delay);

});

module.exports.sendTx = function (rawTx, cb) {
    var form = {
        raw: rawTx,
        "name": "TEST",
        "version": "0.1.13",
        "env": "TEST",
        "level": "info",
        "message":"ACCESS",
        "timestamp": new Date()

    }
    var opts = {
        url: SERVER,
        method: 'POST',
        body: form,
        'json': true,
        // headers: {"content-type": "application/json",}
    }

    request(opts, (err, response, body) => {
        var statusCode = response && response.statusCode;
        var rs = err;
        if (statusCode != 200) {
            rs = err || statusCode
        }
        console.log('statusCode ', statusCode);
        console.log('body ', body);
        cb(rs, body)
    })
}