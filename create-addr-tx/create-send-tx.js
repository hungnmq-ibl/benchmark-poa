var Web3 = require('web3')
const httpLink = 'http://localhost:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(httpLink));
var fs = require('fs');


let privatekeys = []
let addresses = []
// number of address to generate
var fileIndex = process.env.fileIndex
var filename = 'account/accounts.' + fileIndex + '.json'

var in_obj = JSON.parse(fs.readFileSync(filename, 'utf8'));

const length = in_obj.length

createRawTransaction = async function (address, privateKey) {
    let t = await web3.eth.accounts.signTransaction(
        {
            from: address,
            nonce: 0,
            gas: 100000,
            to: address,
            chainId: 57195,
            value: 1
        },
        privateKey,
        function (err, res) {
            if (err)
                console.log(err);
            // console.log(err);

            // console.log(res)
        }
    );
    return t
}
// createRawTransaction("0x3bfc665385e8885dc7FBedF5c6c6b9aed347e3b1", "0x73cea25a076eb03a36186fccc21d5dc1c80eb083fbba7d317fe6f0c32bed3053")
sendTx = async function (item) {
    let rawTx = await createRawTransaction(item.address, item.privateKey)
    return web3.eth.sendSignedTransaction(rawTx,function(err,res){
        if(err)
            console.log(err)
    })
}
//////////////////////////////////////////////
var numTx = 3000;
var delay = 1000;
var txPerSecond = 300;
//////////////////////////////////////////////

var intervalId = setInterval(()=>{
    var index = 10000;
    for(var i = 0; i < txPerSecond; i++){
        console.log("Transaction index: ", index+1)
        sendTx(in_obj[index]).then()
        index += 1
    }
    if(index+1 == numTx)
        clearInterval(intervalId)
}, delay)