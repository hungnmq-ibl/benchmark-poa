var Web3 = require('web3')
server = process.env.SERVER;
const httpLink = 'http://'+ server + ':8545'
const web3 = new Web3(new Web3.providers.HttpProvider(httpLink));
var fs = require('fs');

// number of address to generate
var fileIndex = process.env.fileIndex
var filename = 'account/accounts.' + fileIndex + '.json'
var filenameJson = 'transaction/transactions.' + fileIndex + '.json'

var in_obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
var in_obj_json = JSON.parse(fs.readFileSync(filenameJson, 'utf8'));
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
createAllTransaction = async function () {
    const length = in_obj.length
    for(var i = 0; i < length; i++){
        var item = in_obj[i]
        console.log(i)
        let rawTx = await createRawTransaction(item.address, item.privateKey)
        in_obj_json.push({ "rawTx": rawTx.rawTransaction })
    }
    return in_obj_json
    // in_obj.forEach((item) => {
    //     console.log(item)
        
    //     // console.log(rawTx.rawTransaction)
    //     // await in_obj_json.push({ "rawTx": rawTx.rawTransaction })
    // })
}
createAllTransaction().then(result =>{
    json = JSON.stringify(result);
    fs.writeFile(filenameJson, json, 'utf8', function (err, data) {
        if (err)
            console.log(err);
    }); 
})


