var request = require('request');
var Web3 = require('web3');
var INFO = require('./server-info.js').info;

var events = require('events');
var eventEmitter = new events.EventEmitter();
var totalFinish = 0;
eventEmitter.on('finish', function (err, url) {
    if (err) {
        return console.log('err at: ', url);
    }
    totalFinish++;
    console.log('Total finish ', totalFinish);
})


for (var i = 0; i < INFO.length; i++) {
    var url = `http://${INFO[i].forwarderIp}:8888/create`
    var data = {
        numTx: INFO[i].totalTxCreate,
        receiver: INFO[i].receiverAddress,
        sender: INFO[i].senderAddress,
        privateKey: INFO[i].senderPrivateKey,
        server: INFO[i].fullNodeIp
    };

    (function (url, data) {
        request.post(url, { form: data }, (err, response, body) => {
            var statusCode = response && response.statusCode
            if (err) {
                console.log('error:', err);
            }

            console.log(`Response from ${url} ==> ${statusCode} ==> ${body}`);

            eventEmitter.emit('finish', statusCode != 200, url)
        })
    })(url, data);
}

