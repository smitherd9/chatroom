$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var notifications = $('#notifications');
    var clientNum = $('#notifications');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    var notify = function(notification, clientNum){
        notifications.append('<div>' + notification + ' ' + clientNum + '</div>');
    };

    input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        return;
    }

    var message = input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
});

    
    
socket.on('notification', notify, clientNum);
socket.on('message', addMessage);
});