var express = require('express');
var app = express();
var ethTx = require('ethereumjs-tx');
var Web3 = require('web3');
var async = require('async')

const PUBLIC_ADDR = "0x9317411384a505f01229859cd7e9ea76365ec7d0";
const PRIVATE_ADDR = "3a8e07d28f087e638574441b7464d31273c0423e38ca78776e7fbfcc5cfad159";

var SERVER = process.env.SERVER || 'localhost';
var server_url = "http://" + SERVER + ":8545"

var web3 = new Web3(new Web3.providers.HttpProvider(server_url));

web3.eth.extend({
  property: 'txpool',
  methods: [{
    name: 'status',
    call: 'txpool_status'
  }]
});

console.log("connect to " + server_url);
console.log('pending/queued');
async.whilst(
  function () { return true },
  function (next) {
    web3.eth.txpool.status()
      .then(function (rs) {
        console.log(parseInt(rs.pending, 16),parseInt(rs.queued, 16));
        setTimeout(function () {

          next();
        }, 3000)
      }
      )
      .catch(function (err) {
        next(err)
      })
  },
  function (err) {
    console.log(err);
    console.log("Done");
  }
)