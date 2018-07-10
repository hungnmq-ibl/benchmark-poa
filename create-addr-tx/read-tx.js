var Web3 = require('web3')
server = process.env.SERVER;
const httpLink = 'http://'+ server + ':8545'
const web3 = new Web3(new Web3.providers.HttpProvider(httpLink));
var fs = require('fs');

var fileIndex = process.env.fileIndex
var filename = 'transaction/transactions.' + fileIndex + '.json'

var in_obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
const length = in_obj.length
console.log(length)
function sendTx(rawTransaction) {
    return web3.eth.sendSignedTransaction(rawTransaction, function(err,res){
        if(err)
            console.log(err)
        else
            console.log(res)
    })
}
    
//////////////////////////////////////////////
var numTx = parseInt(process.env.NUMTX);
var delay = parseInt(process.env.DELAY);
var txPerSecond = parseInt(process.env.TX);
var index = parseInt(process.env.INDEX);
//////////////////////////////////////////////
// numTx = numTx + index
// var intervalId = setInterval(()=>{
//     for(var i = 0; i < txPerSecond; i++){
//         if(index+1 % txPerSecond == 0)
//             console.log("Transaction index: ", index+1)
//         sendTx(in_obj[index].rawTx).then()
//         index += 1
//     }
//     if(index+1 == numTx)
//         clearInterval(intervalId)
// }, delay)