from scripts.marvelmind import MarvelmindHedge
from flask import Flask, render_template, jsonify
from time import sleep
import sys
import numpy as np
import os

app = Flask(__name__)

# Class initilization
hedge = MarvelmindHedge(tty = "/dev/ttyACM0", adr=None, debug=False) # create MarvelmindHedge thread
# start thread
hedge.start()


@app.route("/", methods=['GET', 'POST'])
def main():

    return True

@app.route("/update")
def update():
    while True:
        try:
            hedge.dataEvent.wait(1)
            hedge.dataEvent.clear()

            if (hedge.positionUpdated):
                #  hedge.print_position()
                _,x,y,z,_,TimeStamp = hedge.position() # BeaconID, X, Y, Z, Angle, Timestamp

                # jsonify and return
                templateData = {'data' : [x,y,z]}
                return jsonify(templateData), 200
                
        except KeyboardInterrupt:
            hedge.stop()  # stop and close serial port
            sys.exit()
    
    
if __name__ == "__main__":
    app.run(debug=True)
