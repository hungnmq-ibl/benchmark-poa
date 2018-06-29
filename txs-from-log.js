var fs = require('fs');

var filePath = './log-txs.log'
var pattern = /number=\d* txs\=\d* /ig;
fs.readFile(filePath, 'utf8', function (err, contents) {
    var rs = contents.match(pattern)
    for (var i = 0; i < rs.length; i++) {
        var d = rs[i].replace('txs=','').replace(/number=\d* /,'');
        console.log(d);
    }
});

