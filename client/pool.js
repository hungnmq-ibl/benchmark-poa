var request = require('request');
var info = require('./server-info').info;

setInterval(() => {
    for (var i = 0; i < info.length; i++) {
        var url = `http://${info[i].forwarderIp}:8888/pool`

        for (var j = 0; j < info[i].fullNodeIp.length; j++) {
            fIp=info[i].fullNodeIp[j];
            ((url, fIp)=>{
                request.post(url, { form: { server: fIp } }, (err, response, body) => {
                    
                    console.log(body);
                })
            })(url, fIp)
            
        }
    }
}, 3000)

