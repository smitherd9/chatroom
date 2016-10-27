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
    var clientNum = io.engine.clientsCount;
    var name = 'What is your name?';
    var userLeft = 'A demon has returned to hell!';
    // var srvSockets = io.sockets.sockets;
    // var clientNum = Object.keys(srvSockets).length;
    console.log('Client connected');
    console.log(io.engine.clientsCount);
    // socket.emit('question', name);    
    socket.broadcast.emit('notification', notify);
    io.emit('newUser', clientNum);
    
    
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
    
    socket.on('disconnect', function(){
        socket.broadcast.emit('notification', userLeft);
        io.emit('newUser', io.engine.clientsCount);
    });

});

// io.sockets.on('connect', function(client) {
//     clients.push(client); 
    

//     client.on('disconnect', function() {
//         clients.splice(clients.indexOf(client), 1);
        
//     });
// });

server.listen(process.env.PORT || 8080);


