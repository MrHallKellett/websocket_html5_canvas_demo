from flask import render_template, Flask
from flask_socketio import SocketIO, emit
import logging
from random import randint

app = Flask(__name__)
socketio = SocketIO(app)

################################

def get_random_hex():
    '''Generate a random 24-bit hex code colour'''
    channel = lambda: hex(randint(0, 255))[2:].zfill(2)
    return "#" + "".join([channel() for _ in range(3)])

################################


@socketio.on('new_drawing')
def sync_drawings(data: list):
    '''Allow server to accept new drawing updates, and 
    broadcast them to all clients'''
    print("got data", data)
    print("emitting response...")
    emit('update_canvas', {'data': data}, broadcast=True)

################################

@app.route('/')
def home():
    colour = get_random_hex()
    return render_template('index.html', your_colour = colour)

################################

if __name__ == "__main__":

    socketio.run(app, debug=False)