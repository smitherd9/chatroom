var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var clients = [];
var user = {};

io.on('connection', function (socket) {
    var notify = 'A new demon bursts forth!';
    // var clientNum = 'There are now ' + io.engine.clientsCount + ' demons connected.';
    var clientNum = io.engine.clientsCount;
    var name = 'What is your name?';
    console.log('Client connected');
    console.log(io.engine.clientsCount);
    socket.emit('question', name);
    // socket.broadcast.emit('connect', clientNum);
    // io.emit('notification', newClient);
    socket.broadcast.emit('notification', notify);
    socket.broadcast.emit('connect', clientNum);
    
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

});

io.sockets.on('connect', function(client) {
    clients.push(client); 
    

    client.on('disconnect', function() {
        clients.splice(clients.indexOf(client), 1);
        
    });
});

server.listen(process.env.PORT || 8080);


