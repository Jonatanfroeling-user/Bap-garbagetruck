from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from time import sleep

from sense_hat import SenseHat
import math


sense = SenseHat()
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

movement_treshold = 0.02
client_connecion = False

    
def send_movement():
    print('sending-movement')
    acceleration = sense.get_accelerometer_raw()
    new_acceleration = [0,0]
    
    while True:
        sleep(0.1)
        if(not client_connecion):
            sleep(1)
            continue
        
        new_acceleration = sense.get_accelerometer_raw()
        
        x_diff = new_acceleration['x'] - acceleration['x']
        y_diff = new_acceleration['y'] - acceleration['y']
        
        # Calculate the magnitude of the difference
        diff_mag = math.sqrt(abs(x_diff)**2 + abs(y_diff)**2 )
       
        # skip on minimal movement
        if(diff_mag < movement_treshold):
            continue

        socketio.emit('data',  {
            'y': y_diff * 0.00005,
            'x': x_diff * 0.00005,
        })
        acceleration = new_acceleration

        


@socketio.on('connect')
def on_connect():
    global client_connecion
    client_connecion = True
    print('Client connected')

@socketio.on('disconnect')
def on_disconnect():
    global client_connecion
    client_connecion = False
    print('Client disconnected')





if __name__ == '__main__':
    app.debug = False
    socketio.start_background_task(send_movement)
    socketio.run(app, host='localhost', port=8000)