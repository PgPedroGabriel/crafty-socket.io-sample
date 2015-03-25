var net = require('net');
var server = net.createServer();

var HOST = '127.0.0.1';
var PORT = 6969;

server.listen(PORT, HOST);
server.on('connection', function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    // other stuff is the same from here
    sock.write("Hello");

    sock.on('close', function(data){
        console.log("Closed");
    })
});