var ethTx = require('ethereumjs-tx');
var Web3 = require('web3');
const async = require('async');

// const SERVER = "139.162.37.116";
// const SERVER = "139.162.49.38";
// const SERVER = "139.162.8.24";
const SERVER = "139.162.14.28";

var web3 = new Web3(new Web3.providers.HttpProvider("http://" + SERVER + ":8545"));

web3.eth.getBlockNumber(function (error, blockNumber) {
    var from = process.argv[2] ? process.argv[2] : blockNumber;
    var to = process.argv[3] ? process.argv[3] : blockNumber;

    if (from > to) {
        console.log("Error from > to");
        return;
    }

    var totalTx = 0;

    async.whilst(
        function () {
            return from <= to;
        },
        function (next) {
            web3.eth.getBlock(from, function (error, block) {
                console.log('\nBlock', from);
                console.log('Gas Limit', block.gasLimit);
                console.log('Gas Used', block.gasUsed);
                console.log('Number Of Transactions', block.transactions.length);
                console.log('Timestamp', block.timestamp);

                totalTx += block.transactions.length;

                from++;
                next();
            });
        },
        function (err) {
            // All things are done!
            console.log('\nTotal transaction', totalTx);
        }
    );
});