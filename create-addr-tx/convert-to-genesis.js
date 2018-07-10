var Web3 = require('web3')
const web3  = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require('fs');


let privatekeys = []
let addresses = []
// number of address to generate
// var fileIndex = process.env.fileIndex
// var filename = 'account/accounts.'+fileIndex+'.json'
// var filenameJson = 'account/accounts-json.'+fileIndex+'.json'

var filename = 'account/accounts.json'
var filenameJson = 'account/accounts-json.json'

var in_obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
var in_obj_json = ""
const length = in_obj.length
for (var i = 0; i < length; i++){
    var address = in_obj[i].address
    var addressSplit = address.split('x')
    in_obj_json += "\"" + addressSplit[1] + "\"" +" : " + " { " + "\"" + "balance" + "\"" + " : " + "\"" + "0x200000000000000000000000000000000000000000000000000000000000000" + "\"" + " }, "
}
fs.writeFile(filenameJson, in_obj_json, 'utf8', function(err,data){
    if (err)
        console.log(err);
}); 
