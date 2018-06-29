var request = require('request');
var Web3 = require('web3');
var INFO = require('./server-info.js').info;

// for (var i = 0; i < INFO.length; i++) {
//     var url = `http://${INFO[i].forwarderIp}:7777/send`
//     var data = {
//         numTx: INFO[i].sendingNumber,
//     };

//     (function (url, data) {
//         request.post(url, { form: data }, (err, response, body) => {
//             console.log(`Response from ${url}`);
//             if (err) {
//                 console.log('error:', err);
//             }
//             console.log('statusCode:', response && response.statusCode);
//             console.log('body:', body);
//         })
//     })(url, data);

// }

var serverIndex = 0;
var SLEEP_TIME = 20;

setInterval(() => {
    sendRequest(function(){})
}, SLEEP_TIME)


for(var i = 0; i < INFO.length; i++) {
    INFO[i].fullnodeIndex = 0;
}

function sendRequest(cb) {
    var info = INFO[serverIndex];

    var url = `http://${info.forwarderIp}:8888/send`;

    var data = {
        numTx: info.sendingNumber,
        server: info.fullNodeIp[info.fullnodeIndex]
    };

    (function (url, data) {
        request.post(url, { form: data }, (err, response, body) => {
            if (err) {
                console.log('error:', err);
            }
            console.log(`Response from ${url} ==> ${response && response.statusCode} ==> ${body}`);
        })
        serverIndex++;
        if (serverIndex >= INFO.length) {
            serverIndex = 0;
        }
        INFO[serverIndex].fullnodeIndex++;
        if(INFO[serverIndex].fullnodeIndex >= INFO[serverIndex].fullNodeIp.length) {
            INFO[serverIndex].fullnodeIndex = 0;
        }
        cb();
    })(url, data);
}