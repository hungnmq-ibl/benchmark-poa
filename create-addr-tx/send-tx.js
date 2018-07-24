var Web3 = require('web3')
const httpLink = 'http://localhost:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(httpLink));


function sendTx(rawTransaction) {
    return web3.eth.sendSignedTransaction(rawTransaction, function(err,res){
        if(err)
            console.log(err)
        else
            console.log(res)
    })
}
let nonce = web3.eth.getTransactionCount("0xDda6eF2fF259928c561b2D30F0caD2C2736Ce8b6")
console.log(nonce)
const privateKey = "0x65B7FB992F1F6BB683E6DE4E788601B2B21DCF700E75FB0A87F6ABF10A90B654"
createRawTransaction = async function () {
    let t = await web3.eth.signTransaction(
        {
            from: "0xDda6eF2fF259928c561b2D30F0caD2C2736Ce8b6",
            to: "0x5fdc5fd99b832b78b8583aa1839f72aa6c00d901",
            nonce: "0x1",
            gas: "0x76c0", // 30400
            gasPrice: "0x9184e72a000", // 10000000000000
            value: "0x9184e72a", // 2441406250
        },
        privateKey,
        function (err, res) {
            if (err)
                console.log(err);
            // console.log(err);

            // console.log(res)
        }
    );
    console.log(t)
    return t
}

createRawTransaction().then(result => console.log(result))


//curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "0xDda6eF2fF259928c561b2D30F0caD2C2736Ce8b6", "to": "0x5fdc5fd99b832b78b8583aa1839f72aa6c00d901","nonce": "0x11", "gas": "0x76c0", "gasPrice": "0x9184e72a000", "value": "0x9184e72a"}],"id":1}'
//[{"from": "0xDda6eF2fF259928c561b2D30F0caD2C2736Ce8b6", "to": "0x5fdc5fd99b832b78b8583aa1839f72aa6c00d901","nonce": "0x11", "gas": "0x76c0", "gasPrice": "0x9184e72a000", "value": "0x9184e72a"}]