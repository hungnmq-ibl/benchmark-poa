var Web3 = require('web3')
const web3  = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require('fs');


let privatekeys = []
let addresses = []
// number of address to generate
var fileIndex = process.env.fileIndex
var filename = 'account/accounts.'+fileIndex+'.json'
var NUMBER = process.env.NUMBER
var in_obj = JSON.parse(fs.readFileSync(filename, 'utf8'));

generateAddress = function(){
    for(var i = 0; i < NUMBER; i++){
        let account = web3.eth.accounts.create()
        var address = account.address
        var privateKey = account.privateKey
        console.log(i)
        in_obj.push({address: address, privateKey:privateKey}); //add some data
    }
}

writeTransaction = function(address, privateKey){
	fs.readFile(filename, 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
		} else {
		out_obj = JSON.parse(data); //now it an object
		out_obj.push({address: address, privateKey:privateKey}); //add some data
		json = JSON.stringify(out_obj); //convert it back to json
		fs.writeFile(filename, json, 'utf8', function(err,data){
            if (err)
                console.log(err);
        }); // write it back 
	}});
}
generateAddress()
json = JSON.stringify(in_obj); 
fs.writeFile(filename, json, 'utf8', function(err,data){
    if (err)
        console.log(err);
}); 