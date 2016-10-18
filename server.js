var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var clients = [];

io.on('connection', function (socket) {
    var notify = 'A new participant has entered the room.';
    var clientNum = 'There are now ' + io.engine.clientsCount + ' users connected.';
    console.log('Client connected');
    console.log(io.engine.clientsCount);
    // io.emit('notification', newClient);
    socket.broadcast.emit('notification', notify, clientNum);
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
    
    // socket.on('connection', function(notification){
    //     console.log('A new participant has entered the room.');
    //     socket.broadcast.emit('connection', notification);
    // });
    
    socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

io.sockets.on('connect', function(client) {
    clients.push(client); 
    // console.log(clients);

    client.on('disconnect', function() {
        clients.splice(clients.indexOf(client), 1);
        // console.log(clients);
    });
});

server.listen(process.env.PORT || 8080);


