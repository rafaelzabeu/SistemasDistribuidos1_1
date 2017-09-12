$(document).ready(function() {
    var namespace = '/chat'

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
	//gets the name value
	var userNameValue = $('#user_name').val();
	
	//where the user writes their name
	var userName = $('#user_name');
	
	//button to send message
	var submitButton = $('#send_button');
	
	//button to disconnect
	var disconnectButton = $('#disconnect_button');
	
	//bool to check is the name is empty or not
    var isName = false;
	
	//button to send the user name
	var sendName = $('#send_name');
	
    //where the messages are displayed
    var textArea = $('#text_area');
	
    //box where the user writes their messages
    var emmitDataInput = $('#emit_data');
	
	//hides chat elements
	$(textArea).hide();
	$(submitButton).hide();
	$(emmitDataInput).hide();
	$(disconnectButton).hide();
	
    socket.on('connect', function() {
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
        location.reload();
        return false;
    });

	$('form#name_form').submit(function(event){
	    //sends the naming event to the server.
	    var data = {name: $('#user_name').val()};
        socket.emit('sync_name', data);
        $(userName).hide();
			$(sendName).hide();
			$(textArea).show();
			$(submitButton).show();
			$(emmitDataInput).show();
			$(disconnectButton).show();
        return false;
	});

});