var Transaction = artifacts.require("./Transaction.sol");
var Callee = artifacts.require("./Callee.sol");
var AnotherCallee = artifacts.require("./AnotherCallee.sol");
const fs = require('fs')
module.exports = function (deployer) {
  deployer.deploy(AnotherCallee).then(function () {
    deployer.deploy(Callee, AnotherCallee.address).then(function () {
      deployer.deploy(Transaction, Callee.address).then(function () {
        fs.writeFile('./address.txt', Transaction.address, 'utf8', function (err, data) {
          if (err)
            console.log(err);
        });
      })
    });
  })
};