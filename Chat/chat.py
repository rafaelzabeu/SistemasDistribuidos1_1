import sys
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'isASecret'
socketio = SocketIO(app)

# ip = '172.16.66.38:5000'
ip = '127.0.0.1:5000'


# route of the index page
@app.route('/')
def get_index():
    # loads html from the template folder, rendered with Jinja2 and sends it the client
    return render_template('index.html', ip=ip)


# routes to static java script files(as the project presentation room may not have internet connection)
@app.route('/js/jquery-3.2.1.min.js')
def get_jquery():
    return app.send_static_file('jquery-3.2.1.min.js')


@app.route('/js/socket.io.slim.js')
def get_socketio():
    return app.send_static_file('socket.io.slim.js')


@app.route('/js/chat.js')
def get_chat():
    return app.send_static_file('chat.js')
	
# routes to static css file
@app.route('/css/style.css')
def get_css():
    return app.send_static_file('style.css')


# responds to the client connect event on the /chat namespace
@socketio.on('connect', namespace='/chat')
def on_connect():
    print('connected', file=sys.stderr)


@socketio.on('disconnect', namespace='/chat')
def on_disconnect():
    # avisa os clientes que alguem disconectou
    emit('message', {'data': 'User' + request.sid + ' disconnected'}, broadcast=True)


# responds to the naming event send by the client after connection. TODO: Actually implement usernames
@socketio.on('sync_name', namespace='/chat')
def on_sync_name(message):
    emit('message', {'data': 'User ' + message['name'] + ' connected!'}, broadcast=True)


# responds to the message sent by client event and broadcasts it to all connected clients
@socketio.on('message', namespace='/chat')
def on_message_recived(message):
    emit('message', {'data': request.sid + ':' + message['message']}, broadcast=True)


if __name__ == '__main__':
    # socketio.run(app, host='0.0.0.0')
    socketio.run(app)
