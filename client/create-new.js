var request = require('request');
var Web3 = require('web3');
var INFO = require('./server-info.js').info;

var events = require('events');
var eventEmitter = new events.EventEmitter();
var totalFinish = 0;
eventEmitter.on('finish', function (err, url, msg) {
    if (err) {
        return console.log('err at: ', url, ": ", msg);
    }
    totalFinish++;
    console.log('Total finish ', totalFinish);
})


for (var i = 0; i < INFO.length; i++) {
    var url = `http://${INFO[i].forwarderIp}:8888/create-new`
    var data = {
        sendingValue: INFO[i].sendingValue,
        sender: INFO[i].senderAddress,
        privateKey: INFO[i].senderPrivateKey,
        newAddrNum: INFO[i].newAddrNum,
        spreadValue: INFO[i].spreadValue,
        numTx: INFO[i].totalTxCreate,
        server: INFO[i].fullNodeIp
    };

    (function (url, data) {
        var opts = {
            url: url,
            method: 'POST',
            form:data,
        }
        request(opts, (err, response, body) => {
            var statusCode = response && response.statusCode
            if (err) {
                console.log('error:', err);
            }

            console.log(`Response from ${url} ==> ${statusCode} ==> ${body}`);

            eventEmitter.emit('finish', statusCode != 200, url, body)
        })
    })(url, data);
}

