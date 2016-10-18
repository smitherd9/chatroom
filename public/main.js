$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var notifications = $('#notifications');
    var clientNumber = $('#clientCounter');
    

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    var notify = function(notification){
        notifications.empty();
        notifications.append('<div>' + notification + '</div>').fadeIn(1500);
        notifications.fadeOut(1500);
    };
    
    var clientCount = function(clientNum){
        // clientNumber.empty();
        clientNumber.append('<span>' + clientNum + '</span>');
        console.log(clientNum);
    }
    
    var name = function(name){
        
    }

    input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        return;
    }

    var message = input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
});

    
    
socket.on('notification', notify);
socket.on('message', addMessage);
socket.on('connect', clientCount);
socket.on('question', name);
});