var request = require('request');
var info = require('./server-info').info;

var url = `http://139.162.12.114:8888/timeout`
var startTime = new Date().getTime();
request.get({url:url, timeout:180000, forever:true}, (err, response, body) => {
    console.log('Time ', new Date().getTime() - startTime);
    console.log(err);
    var statusCode = response && response.statusCode
    console.log(statusCode);
    console.log(body);
})


// var ethTx = require('ethereumjs-tx');

// var raw = '0xf8692e10830f42409408fe1b63373220b64e922a9b820b5990d990071f89f635c9adc5dea00000801ca0582655aa13a404259629415f2b66c7f1a37b30d2ab3dff46296647fe495ca985a02d9fb1615d7f56cdb65e02ccf7173ae817da32228c81ad956a8ce6b0a1c28602'

// var tx= new ethTx(raw)
// console.log(tx.getSenderAddress().toString('hex'));
// console.log('to :', tx.toJSON()[3]);
// console.log('nonce: ', parseInt(tx.toJSON()[0]), 16);