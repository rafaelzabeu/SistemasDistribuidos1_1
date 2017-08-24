$(document).ready(function() {
    var namespace = '/chat'

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

    //where the messages are displayed
    var textArea = $('#textArea');
    //box where the user writes their messages
    var emmitDataInput = $('#emit_data');

    socket.on('connect', function() {
        //sends the naming event to the server. TODO: Implement name input for the user
        socket.emit('sync_name', {name: 'coisa'});
        alert('Connected!'); //TODO: Change feedback from alert
    });

    socket.on('message', function(msg){
        //alert('Recived \n');
        //appends the recived message to the display
        textArea.val(textArea.val() + '\n' + msg.data);
        //clear the the user input
        emit_data.value = '';
    });

    $('form#input').submit(function(event) {
        //gets what the user wrote
        var data = {message:$('#emit_data').val()};
        //send it to the server
        socket.emit('message', data);
        return false;
    });

    //TODO: Make disconnect button work
    $('form#disconnect').submit(function(event) {
        socket.emit('disconnect_request');
        return false;
    });

});