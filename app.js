var express = require('express');
var app = express();
var ethTx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');
var Web3 = require('web3');
var BN = Web3.utils.BN;
var async = require('async')
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// app.use(timeout(2000000))

app.get('/timeout', function(req, res){
    console.log('Wait 2min');
    setTimeout(()=>{
        console.log('Send OK');
        res.send('OK')
    }, 120000)
})
// const PUBLIC_ADDR = "DE42C681EaB00dC37E29aE56dB6ff2391374AEA5";
// const PRIVATE_ADDR = "56f2757d4951ec9eaa8ee33567586da53ec0793474e730f804124bb3908151d6";

// const PUBLIC_ADDR = "BC18Dc2dfA9b16af8A8159D8d828904e9e433383";
// const PRIVATE_ADDR = "0cdc73d00f424756c71451773d7bdeaabb4bc55c2e83c46f3a7201569caa0866";

// const PUBLIC_ADDR = "5114cE2D7577aE4f68D5eAEF603D269Adf1eED73";
// const PRIVATE_ADDR = "3472f8748fc86f850fefac4aaa0128eac21833b7b701947bdea8e9ad6c554b19";

// const PUBLIC_ADDR = "A5AC61B07A24ddeE3930FED7054989B1A5aa8B41";
// const PRIVATE_ADDR = "d581d154da60dded7e70a8ab61020b143dd89969bb8d83c57aa1458c96bde19b";

// const PUBLIC_ADDR = "D11C45cBD80711FBa68af9aa99C021395F3A7159";
// const PRIVATE_ADDR = "99d5f53bf52ea1acc1e4e669c0a576c2565d88a035360d3e4bf93e73ce9f3827";

// const PUBLIC_ADDR = "c07C195dcDAfEB2cAe8d0A97bfcba5c9f6FA14ef";
// const PRIVATE_ADDR = "060a031211f352d494bfd667245c3f0b319e2b8f7ca69dc87df188d096b6ee2b";

// const PUBLIC_ADDR = "618415DD04E50cAFD521F30eBCa56C2C9966fE0B";
// const PRIVATE_ADDR = "2641516ec3d85d9d566b0b02eec3d43f676381c8c6df3496428c153254bf0640";

// const PUBLIC_ADDR = "bF6F136381Cc66Ffa2e07A2d724FC379C29670E3";
// const PRIVATE_ADDR = "a1c2b5446aba1494d646ee532d4c55d26e5ded3b6cee6204fa9ef6b57c587620";

// const PUBLIC_ADDR = "e9cEea9f6d612798b5dE4d5d40ffB2A6F2bfc1a5";
// const PRIVATE_ADDR = "e175c4b81ba27ea9a41ff98e7e880bfef5582dce959ef1399cf19f519d746d1c";
const PUBLIC_ADDR = "79f2F24Cb62cB5B0F22975dF15b40f8F9Cb07E66";
const PRIVATE_ADDR = "3894f1d71fc597c2a0b179fb541b29537f7a54458607026276a6dd9c97dda9aa";

app.get('/', function (req, res) {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://" + req.query.server + ":8545"));

    web3.eth.getTransactionCount(PUBLIC_ADDR, 'pending', function (error, nonce) {
        var arr = [];
        var numTx = req.query.numTx ? req.query.numTx : 1000;
        var value = req.query.value ? req.query.value : 300;
        var receiver = req.query.receiver ? req.query.receiver : '0x0';
        var delay = req.query.delay ? req.query.delay : 1000;
        var count = req.query.count ? req.query.count : 1000;

        for (var i = 0; i < numTx; i++) {
            // console.log(nonce);

            var txParams = {
                nonce: '0x' + nonce.toString(16),
                gasPrice: '0x10',
                gasLimit: '0xF4240',
                to: receiver,
                value: '0x' + value.toString(16)
            };

            // console.log(txParams);

            // Transaction is created
            var tx = new ethTx(txParams);
            var privKey = Buffer.from(PRIVATE_ADDR, 'hex');

            // Transaction is signed
            tx.sign(privKey);
            var serializedTx = tx.serialize();
            var rawTx = '0x' + serializedTx.toString('hex');

            arr.push(rawTx);
            nonce++;
        }

        var refreshIntervalId = setInterval(function () {
            console.log("Interval");

            for (var i = 0; i < count; i++) {
                if (arr.length == 0) {
                    clearInterval(refreshIntervalId);
                    break;
                }

                try {
                    web3.eth.sendSignedTransaction(arr.shift(), function (err, hash) {
                        if (!err)
                            console.log(hash);
                        else
                            console.log(err);
                    });

                } catch (e) {

                }
            }
        }, delay);

        res.status.send('Finish');
    });
})


var Info = {
    'ip': {
        web3: {},
        txList: [],
        index: 0
    }
};

app.post('/init', (req, res) => {
    Info = {};
    var listIp = req.body.server;
    var minerIp = req.body.miner;

    var minerIdx = 0;
    for (var i = 0; i < listIp.length; i++) {
        ((ip) => {
            Info[ip] = {};
            web3 = new Web3(new Web3.providers.HttpProvider("http://" + ip + ":8545"));
            web3.eth.extend({
                property: 'txpool',
                methods: [{
                    name: 'status',
                    call: 'txpool_status'
                }]
            });

            minerWeb3 = new Web3(new Web3.providers.HttpProvider("http://" + minerIp[minerIdx] + ":8545"));
            minerWeb3.eth.extend({
                property: 'txpool',
                methods: [{
                    name: 'status',
                    call: 'txpool_status'
                }]
            });
           
            Info[ip]['web3'] = web3;
            Info[ip]['minerWeb3'] = minerWeb3;
            
            minerIdx += 1;
            if(minerIdx > minerIp.length) {
                minerIdx = 0;
            }
        })(listIp[i])
    }

    res.status(200).send('ok');
})

app.post('/create', (req, res) => {
    var value = '0x01';
    var numTx = req.body.numTx;
    console.log(req.body.receiver);
    var receiver = req.body.receiver
    var senderAddress = req.body.sender
    var privateKey = req.body.privateKey
    var server = req.body.server
    // console.log(req.body);
    console.log(server);
    // console.log(numTx);
    // console.log(receiver);
    // console.log(senderAddress);
    // console.log(privateKey);

    for (var i = 0; i < server.length; i++) {
        if (!Info[server[i]] || !Info[server[i]]['web3']) {
            res.status(500).send(`Didn't create web3 yet`);
        }
    }

    if (senderAddress.length != privateKey.length || senderAddress.length != receiver.length
        || senderAddress.length != server.length) {

        res.status(500).send(`Length of sender, private key or receiver are different`);
    }

    var idx = 0;

    async.forEachSeries(server, function (ip, next) {
        Info[ip]['web3'].eth.getTransactionCount(senderAddress[idx], 'pending', function (err, nonce) {
            if (err || (nonce == null || nonce == undefined)) {
                error = `Can not get nonce from ${ip}: ` + err;
                return next(error);
            }
            var privKey = Buffer.from(privateKey[idx], 'hex');
            var txList = [];

            for (var i = 0; i < numTx; i++) {
                var txParams = {
                    nonce: '0x' + nonce.toString(16),
                    gasPrice: '0x10',
                    gasLimit: '0x30D40',
                    to: receiver[idx],
                    value: value
                };

                // Transaction is created
                var tx = new ethTx(txParams);
                tx.sign(privKey);
                var serializedTx = tx.serialize();
                var rawTx = '0x' + serializedTx.toString('hex');

                txList.push(rawTx);
                nonce++;
            }
            Info[ip]['txs'] = txList;
            Info[ip]['TxIndex'] = 0;

            idx++;
            next();
        })
    }, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {

            res.status(200).send(`Created tx ${numTx} for ${server}.`);
        }
    })
})

app.post('/send', (req, res) => {

    var numTx = parseInt(req.body.numTx);
    var ip = req.body.server;
    var sleepTime = req.body.sleepTime || 1000;

    // Check remain tx
    var info = Info[ip];
    if (!info) {
        return res.status(500).send(`Din't init info for ${ip}`)
    }
    if (!info.web3) {
        return res.status(500).send("Didn't init web3 yet for ${ip}")
    }
    if (info.TxIndex >= info.txs.length) {
        return res.status(500).send(`Doesn't have enough tx. Remain ${info.txs.length - info.TxIndex} but request ${numTx}`);
    }
    for (var i = 0; i < numTx && info.TxIndex < info.txs.length; i++) {
        ((tx, ip) => {
            info.web3.eth.sendSignedTransaction(tx, function (err, hash) {
                if (err) {
                    var parseTx = new ethTx(raw);
                    var json = parseTx.toJSON()
                    var msg = `${parseTx.getSenderAddress().toString('hex')}-->${json[3]}, nonce=${parseInt(json[0], 16)} `
                    msg = msg + err
                    console.log(ip + ' : ', err);
                }
            });
        })(info.txs[info.TxIndex], ip)

        info.TxIndex++;
        console.log(`send to: ${ip} ${info.TxIndex}`);
    }
    res.status(200).send(`Send ${numTx}tx to ${ip} remain: ${info.txs.length - info.TxIndex}`)
})

app.post('/pool', (req, res) => {
    var ip = req.body.server;

    var info = Info[ip];
    if (!info) {
        return res.status(500).send(`Din't init info for ${ip}`)
    }
    if (!info.web3) {
        return res.status(500).send("Didn't init web3 for ${ip}")
    }

    web3.eth.txpool.status()
        .then(function (rs) {
            rs = ip + ' \t ' + parseInt(rs.pending, 16) + ',' + parseInt(rs.queued, 16);
            res.status(200).send(rs);
        }
        )
        .catch(function (err) {
            res.status(500).send('Can not get pool_status from ' + ip + '---->' + err);
        })
})


app.post('/create-new', (req, res) => {
    var sendingValue = req.body.sendingValue; // Eth value, send to new address
    var senderAddress = req.body.sender // Spread address that send eth to new address
    var privateKey = req.body.privateKey // Private key of spread address
    var newAddrNum = req.body.newAddrNum; // Number of new address that will be created
    var spreadValue = req.body.spreadValue; // Eth value that will be spread to new address
    var numTx = req.body.numTx; // Number of tx will be sent from a new address
    var server = req.body.server // List of server
    // console.log('spreadValue ', typeof spreadValue,' ', spreadValue);

    for (var i = 0; i < server.length; i++) {
        if (!Info[server[i]] || !Info[server[i]]['web3'] || !Info[server[i]]['minerWeb3']) {
            return res.status(500).send(`Didn't create web3 yet(please check fullnode or miner)`);
        }
    }

    if (senderAddress.length != privateKey.length
        || senderAddress.length != server.length) {

            return res.status(500).send(`Length of sender, private key or receiver are different`);
    }

    var idx = 0;

    async.forEachSeries(server, function (ip, next) {
        Info[ip]['minerWeb3'].eth.getTransactionCount(senderAddress[idx], 'pending', function (err, nonce) {
            if (err || (nonce == null || nonce == undefined)) {
                error = `Can not get nonce from ${Info[ip]['minerWeb3'].currentProvider.host}: ` + err;
                return next(error);
            }
            var privKeySender = Buffer.from(privateKey[idx], 'hex');
            var prvSeed = ip;

            var newAddrAndTx = createNewAddressAndTx(newAddrNum, numTx, prvSeed, senderAddress[idx], sendingValue)

            Info[ip]['txs'] = newAddrAndTx.txs;
            Info[ip]['TxIndex'] = 0;

            sendEthToListAddress(Info[ip]['web3'], newAddrAndTx.addrs, senderAddress[idx], privKeySender, nonce, spreadValue, (err) => {
                idx++;
                next(err);
            })
        })
    }, function (err) {
        if (err) {
            console.log("Err ", err);
            res.status(500).send(err);
        } else {

            res.status(200).send(`Created new ${newAddrNum} addresses and ${numTx}txs to each of them for ${server}.`);
        }
    })
})

function sendEthToListAddress(web3, listAddress, sender, privateKey, nonce, value, cb) {
    async.forEachSeries(listAddress, (addr, next) => {
        var txParams = {
            nonce: '0x' + nonce.toString(16),
            gasPrice: '0x01',
            gasLimit: '0x30D40',
            to: addr,
            value: new BN(value) 
        };

        var tx = new ethTx(txParams);
        tx.sign(privateKey);
        var serializedTx = tx.serialize();
        var rawTx = '0x' + serializedTx.toString('hex');
        web3.eth.sendSignedTransaction(rawTx, (err, txid) => {
            if (err) {
                var msg = `Error: Spread ${sender} --> ${addr} ${value} by fullnode ${web3.eth.currentProvider.host}`
                return next(msg + err);
            }
            nonce++;
            console.log(`Spread ${value } to ${addr}`);
            return next()
        })

    }, (err) => {
        cb(err)
    })
}
function createNewAddressAndTx(addrNumber, txNumber, prvSeed, receiverAddress, sendingValue) {
    var txList = [];
    var addrList = [];
    var pk = prvSeed + new Date().getTime();
    for (var i = 0; i < addrNumber; i++) {
        var prvKey = pk + i;
        prvKey = ethUtil.sha3(prvKey);
        var address = '0x'+ethUtil.privateToAddress(prvKey).toString('hex');
        addrList.push(address);

        for (var j = 0; j < txNumber; j++) {
            var txParams = {
                nonce: '0x' + j.toString(16),
                gasPrice: '0x01',
                gasLimit: '0x30D40',
                to: receiverAddress,
                value:  new BN(sendingValue)
            };
            // console.log('sending val: ', new BN(sendingValue).toString());

            console.log(`${i}: ${address} --> ${receiverAddress}: ${sendingValue}`);

            var tx = new ethTx(txParams);
            tx.sign(prvKey);
            var serializedTx = tx.serialize();
            var rawTx = '0x' + serializedTx.toString('hex');

            txList.push(rawTx);
        }
    }
    return { addrs: addrList, txs: txList };
}

var server = app.listen(8888, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
});

server.timeout = 2000000
