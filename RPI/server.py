### RPI Triton Serial Alert System ### 
# Code works to listen for serial connections ###
# Once rpi receieves appropiate shutoff signal from PLC ###
# then rpi will send off a message to configured cellphone number ###
# via the TextBelt REST API call.
######################################

import serial
import requests
import os
import sys
import distutils.util
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

def alert():
    TEXTBELT_API_KEY = ""
    isTest = True
    msg = "Test message"
    number = os.environ.get("PHONE_NUMBER")

    if isTest:
        TEXTBELT_API_KEY = os.environ.get("TB_API_KEY") + "_test"
    else:
        TEXTBELT_API_KEY = os.environ.get("TB_API_KEY")

    print(TEXTBELT_API_KEY)

    res = requests.post("https://textbelt.com/text", {
        'phone': number,
        'message': msg,
        'key': TEXTBELT_API_KEY,
    })

    print(res.json())

    sys.exit()

def loop():
    BAUDRATE = os.environ.get("BAUDRATE")
    ser = serial.Serial('/dev/cu.usbserial-1420',
    baudrate = BAUDRATE,
    parity = serial.PARITY_NONE,
    stopbits = serial.STOPBITS_ONE,
    bytesize = serial.EIGHTBITS,
    )

    isTriggered = False

    while True:
        data = ser.read_until(b'\r').decode('utf-8', 'ignore').strip('\r').replace(" ", "")
        arr = data.split(',')

        strBool = distutils.util.strtobool(arr[3])
        print(arr)
        isTriggered = bool(strBool)

        if isTriggered:
            alert()

        print(data)

if __name__ == "__main__":
    while True:
        loop()