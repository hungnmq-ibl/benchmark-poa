
// How to run:
// FROM=19663 TO=19974 SERVER=45.79.8.29 node block-time.js
var express = require('express');
var app = express();
var ethTx = require('ethereumjs-tx');
var Web3 = require('web3');
var async = require('async')

const PUBLIC_ADDR = "0x9317411384a505f01229859cd7e9ea76365ec7d0";
const PRIVATE_ADDR = "3a8e07d28f087e638574441b7464d31273c0423e38ca78776e7fbfcc5cfad159";

var SERVER = process.env.SERVER || 'localhost';
var FROM = process.env.FROM
var TO = process.env.TO
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
var lastTime = 0;
var i = parseInt(FROM)
var limit = parseInt(TO)
async.whilst(
  function () { return i< limit },
  function (next) {
    web3.eth.getBlock(i)
      .then(function (rs) {
        console.log(`${rs.transactions.length}: ${rs.timestamp - lastTime}`);
        lastTime = rs.timestamp
        setTimeout(function () {
          i++
          next();
        }, 500)
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