var Web3 = require('web3')
const httpLink = 'http://localhost:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(httpLink));
var fs = require('fs');
var kaffa_post = require('kaffa-post.js')


//////////////////////////////////////////////
var numTx = 10000;
var delay = 1000;
var txPerSecond = 100;
//////////////////////////////////////////////
var fileIndex = process.env.fileIndex
var filename = 'transaction/transactions.' + fileIndex + '.json'

var in_obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
const length = in_obj.length
function sendTx(rawTransaction) {
    kaffa_post.sendTx(rawTransaction, function(err,res){
        if(err)
            console.log(err)
        else
            console.log(res)
    })
}

var intervalId = setInterval(()=>{
    var index = 0;
    for(var i = 0; i < txPerSecond; i++){
        console.log("Transaction index: ", index+1)
        sendTx(in_obj[index].rawTx).then(console.log)
        index += 1
    }
    if(index+1 == numTx)
        clearInterval(intervalId)
}, delay)
    
}
