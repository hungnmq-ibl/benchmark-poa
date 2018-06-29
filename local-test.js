
var Web3 = require('web3');
var async = require('async')
var ethTx = require('ethereumjs-tx');
const PUBLIC_ADDR = "0x2ca47b0e493a414c4834270d4466f70dbd1a2748";
const PRIVATE_ADDR = "6219f7edefd89398db0e42591fb833b3b30cecf084c09270c9b8dfa721c22d2f";

var web3Nonce = new Web3(new Web3.providers.HttpProvider("http://45.79.104.43:8546"));
var web3 = new Web3(new Web3.providers.HttpProvider("http://45.79.8.29:8545"));

web3Nonce.eth.getTransactionCount(PUBLIC_ADDR, 'pending', function (error, nonce) {
    var arr = [];
    var numTx = 100;
    var value = 300;
    var receiver = '0xbaf5a34c6f82aaef0fa8d3e32a8bd6b1eb42337b';
    var count = 100;

    for (var i = 0; i < numTx; i++) {


        var txParams = {
            nonce: '0x' + nonce.toString(16),
            gasPrice: '0x10000',
            gasLimit: '0xF4240',
            to: receiver,
            value: '0x' + value.toString(16)
        };

        var tx = new ethTx(txParams);
        var privKey = Buffer.from(PRIVATE_ADDR, 'hex');


        tx.sign(privKey);
        var serializedTx = tx.serialize();
        var rawTx = '0x' + serializedTx.toString('hex');

        arr.push(rawTx);
        nonce++;
    }

    var tid = setInterval(() => {
        if (!arr.length) {
            clearInterval(tid);
            console.log('finish');
            return;
        }
        for (var i = 0; i < count; i++) {
            if (arr.length == 0) {
                break
            }
            web3.eth.sendSignedTransaction(arr.shift(), function (err, hash) {
                if (!err)
                    console.log(hash);
                else
                    console.log(err);
            });
        }
    }, 1000)
});