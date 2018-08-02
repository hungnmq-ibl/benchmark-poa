Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const fs = require('fs')
var Tx = require('ethereumjs-tx');

var transactionObj = JSON.parse(fs.readFileSync('contract/build/contracts/Transaction.json'));


var transactionContractAddress = fs.readFileSync('contract/address.txt')
const CONTRACT_ADDRESS = transactionContractAddress.toString()
// console.log(CONTRACT_ADDRESS)
const privateKey = "65b7fb992f1f6bb683e6de4e788601b2b21dcf700e75fb0a87f6abf10a90b654"
// console.log(transactionObj.abi)
var transactionContract = new web3.eth.Contract(transactionObj.abi, CONTRACT_ADDRESS)
console.log(CONTRACT_ADDRESS)
var type = process.env.TYPE
var dataRegister
if (type == 'light') {
	console.log("Execute light transaction")
	dataRegister = transactionContract.methods.lightTransaction().encodeABI()
} else if (type == 'medium') {
	console.log("Execute medium transaction")
	dataRegister = transactionContract.methods.mediumTransaction().encodeABI()
} else {
	console.log("Execute hard transaction")
	dataRegister = transactionContract.methods.hardTransaction().encodeABI()
}


console.log(dataRegister)
//0x82aa7738
// CreateAndBroadcastTx(dataRegister, privateKey)
// sendTx(dataRegister)
sendEthereumJsTx(dataRegister)

function CreateAndBroadcastTx(privateKey, dataRegister) {
	return web3.eth.accounts.signTransaction({
			data: dataRegister,
			gas: 2000000,
			to: CONTRACT_ADDRESS,
			gasPrice: '20000000000000',
			chainId: 15,
			value: 0
		},
		privateKey,
		function (err, res) {
			if (err) return Promise.reject(err);

			console.log(err);

			console.log(res)

			//get raw transaction
			const signedTransaction = res.rawTransaction;

			// broadcast signed transaction
			web3.eth.sendSignedTransaction(signedTransaction, (err, res) => {

				console.log(err);

				console.log(res);
			});
		}
	);
}

function sendTx(privateKey, dataRegister) {
	return web3.eth.sendTransaction({
			from: "0xdda6ef2ff259928c561b2d30f0cad2c2736ce8b6",
			to: CONTRACT_ADDRESS,
			data: dataRegister,
			gas: 10000000
		},
		function (err, res) {
			if (err) return Promise.reject(err);

			console.log(err);

			console.log(res)

			//get raw tr
		})
}

function sendEthereumJsTx_RawTx() {
	web3.eth.getTransactionCount("0xdda6ef2ff259928c561b2d30f0cad2c2736ce8b6", 'pending', function (err, res) {
		var PRIVATE_ADDR = "65b7fb992f1f6bb683e6de4e788601b2b21dcf700e75fb0a87f6abf10a90b654"
		var txParams = {
			gasPrice: '0x10',
			gasLimit: '0x4C4B40',
			from: "0xdda6ef2ff259928c561b2d30f0cad2c2736ce8b6",
			to: 0xdda6ef2ff259928c561b2d30f0cad2c2736ce8b6,
			value: 0,
			nonce: '0x' + res.toString(16)
		};

		// console.log(txParams);

		// Transaction is created
		var tx = new Tx(txParams);
		var privKey = Buffer.from(PRIVATE_ADDR, 'hex');

		// Transaction is signed
		tx.sign(privKey);
		var serializedTx = tx.serialize();
		
		web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
			.on('receipt', console.log);
	})

}



function sendEthereumJsTx(dataRegister) {
	web3.eth.getTransactionCount("0xdda6ef2ff259928c561b2d30f0cad2c2736ce8b6", 'pending', function (err, res) {
		var PRIVATE_ADDR = "65b7fb992f1f6bb683e6de4e788601b2b21dcf700e75fb0a87f6abf10a90b654"
		var txParams = {
			gasPrice: '0x10',
			gasLimit: '0x4C4B40',
			from: "0xdda6ef2ff259928c561b2d30f0cad2c2736ce8b6",
			to: CONTRACT_ADDRESS,
			data: dataRegister,
			value: 0,
			nonce: '0x' + res.toString(16)
		};

		// console.log(txParams);

		// Transaction is created
		var tx = new Tx(txParams);
		var privKey = Buffer.from(PRIVATE_ADDR, 'hex');

		// Transaction is signed
		tx.sign(privKey);
		var serializedTx = tx.serialize();
		console.log("Raw tx: ", '0x' + serializedTx.toString('hex'))
		web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
			.on('receipt', console.log);
	})

}