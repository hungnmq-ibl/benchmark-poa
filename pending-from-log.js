var fs = require('fs');

var filePath = './log-pending.log'
var pattern = /pending: \d*/ig;
fs.readFile(filePath, 'utf8', function (err, contents) {
    var rs = contents.match(pattern)
    // console.log(rs);
    for (var i = 0; i < rs.length; i++) {
        var d = rs[i].replace('pending:','');
        console.log(d);
    }
});
