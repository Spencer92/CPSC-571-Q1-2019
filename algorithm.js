var http = require('http');

var key_i = 0;
var r = 0;


http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });
    response.end('Hello World\n');
}).listen(3000);


http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });
    response.end('Hello World\n');
}).listen(3001);

//recieve single bit of information
//use key _i_ to identify information
//generate random number r_i
//send (i,x(bar)_i = x_i (xor) r_i) to one site
//send (i,r_i) to another site
//
