$(document).ready(function() {
    var namespace = '/chat'

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
	//gets the name value

	var userNameValue =  $('#user_name').val();
	var userName = $('#user_name');
	var submitButton = $('#send_button');
    var isName = false;
	var sendName = $('#send_name');
    //where the messages are displayed
    var textArea = $('#text_area');
    //box where the user writes their messages
    var emmitDataInput = $('#emit_data');
	$(textArea).hide();
	$(submitButton).hide();
	$(emmitDataInput).hide();
	//hides the chat elements
	
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
	
	//Verifies if the user has a name
	
	$('#send_name').click(function()
	{
		if (userNameValue.length > 0)
		{
			isName = true;
		}
	});
	
	if (isName == true)
	{
		$(userName).hide();
		$(sendName).hide();
		$(textArea).show();
		$(submitButton).show();
		$(emmitDataInput).show();
	}
});