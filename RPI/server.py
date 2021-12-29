### RPI Triton Serial Alert System ### 
# Code works to listen for serial connections ###
# Once rpi receieves appropiate shutoff signal from PLC ###
# then rpi will send off a message to configured cellphone number ###
# via the TextBelt REST API call.
######################################

import serial
import time
import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

serialPort = os.environ.get('SERIAL_PORT')
baudrate = int(os.environ.get('BAUDRATE'))

print(serialPort, baudrate)

def main():
    # Serial( PORT, Baudrate)
    ser=serial.Serial(serialPort, baudrate)

    signal = ser.readline()

    if signal == "water-shutoff":
        print('sent sms!')
    else:
        print('invalid serial signal recieved: %s' % signal)

    print(signal)
    ser.close()

if __name__ == "__main__":
    while True:
        main()
        time.sleep(5)