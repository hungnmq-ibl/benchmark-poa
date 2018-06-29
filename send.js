var express = require('express');
var app = express();
var ethTx = require('ethereumjs-tx');
var Web3 = require('web3');

const PUBLIC_ADDR = "0x9317411384a505f01229859cd7e9ea76365ec7d0";
const PRIVATE_ADDR = "3a8e07d28f087e638574441b7464d31273c0423e38ca78776e7fbfcc5cfad159";

var SERVER = 'localhost';

var web3 = new Web3(new Web3.providers.HttpProvider("http://" + SERVER + ":8545"));

web3.eth.getTransactionCount(PUBLIC_ADDR, 'pending', function (error, nonce) {
    var arr = [];
    var numTx = 1000;
    var value = 300;
    var receiver = '0x8b1a1ad5957573925a8273f449a9283b6f369181';
    var delay = 1000;
    var count = 100;

    for (var i = 0; i < numTx; i++) {
        // console.log(nonce);

        var txParams = {
            nonce: '0x' + nonce.toString(16),
            gasPrice: '0x10',
            gasLimit: '0xF4240',
            to: receiver,
            value: '0x' + value.toString(16)
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

    var refreshIntervalId = setInterval(function () {
        console.log("Interval");

        for (var i = 0; i < count; i++) {
            if (arr.length == 0) {
                clearInterval(refreshIntervalId);
                break;
            }

            try {
                web3.eth.sendSignedTransaction(arr.shift(), function (err, hash) {
                    if (!err)
                        console.log(hash);
                    else
                        console.log(err);
                });

            } catch (e) {

            }
        }
    }, delay);

});


