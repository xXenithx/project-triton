import requests
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

TEXTBELT_API_KEY = ""
isTest = True
msg = "Yo Alex! "
number = os.environ.get("PHONE_NUMBER")

if isTest:
    TEXTBELT_API_KEY = os.environ.get("TB_API_KEY") + "_test"
else:
    TEXTBELT_API_KEY = os.environ.get("TB_API_KEY")


print(TEXTBELT_API_KEY)

res = requests.post('https://textbelt.com/text', {
  'phone': number,
  'message': msg,
  'key': TEXTBELT_API_KEY,
})

print(res.json())
