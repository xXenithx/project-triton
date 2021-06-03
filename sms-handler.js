require('dotenv').config();
const request = require('request');
TEXTBELT_API_KEY = "";
isTest = false;

if (isTest){
    TEXTBELT_API_KEY = process.env.TB_API_KEY + "_test";
}
else{
    TEXTBELT_API_KEY = process.env.TB_API_KEY;
}

msg = "Hello World!";
phone_num = "9152268454";


request.post('https://textbelt.com/text', {
  form: {
    phone: phone_num,
    message: msg,
    key: TEXTBELT_API_KEY,
  },
}, (err, httpResponse, body) => {
  console.log(JSON.parse(body));
});