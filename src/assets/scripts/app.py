from marvelmind import MarvelmindHedge
from flask import Flask, render_template, jsonify, render_template_string
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

@app.route("/test", methods=['GET', 'POST'])
def test():
    value = "x y z"
    t = render_template_string('''<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="css url"/>
    </head>
    <body>
        <p><h1>My flask is Running! </h1></p>
    </body>
</html>
''')
    return t


@app.route("/update")
def update():
    while True:
        try:
            hedge.dataEvent.wait(1)
            hedge.dataEvent.clear()

            if (hedge.positionUpdated):
                #  hedge.print_position()
                _,x,y,z,_,TimeStamp = hedge.position() # BeaconID, X, Y, Z, Angle, Timestamp
                # hedge.print_position()
                # jsonify and return
                templateData = {'data' : [x,y,z]}
                return jsonify(templateData), 200
                
        except KeyboardInterrupt:
            hedge.stop()  # stop and close serial port
            sys.exit()
    
if __name__ == "__main__":
    app.run(debug=True)
