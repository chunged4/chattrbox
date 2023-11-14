var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});

var messages = [];
console.log('websocket server started');

ws.on('connection', function (socket) {
    console.log('client connection established');

    messages.forEach(function (msg) {
        socket.send(msg);
    });

    socket.on('message', function (data) {
        messages.push(data);
        ws.clients.forEach(function (clientSocket) {
            var obj = JSON.parse(data);
            var str = JSON.stringify(obj);
            console.log('message received: ' + str);
            clientSocket.send(str);
        });
    });
});