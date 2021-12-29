#include <ESP8266WiFi.h>

#define STASSID "ESPNET"
#define STAPSWD "test1234"

const char* ssid = STASSID;
const char* pswd = STAPSWD;


const char* host = "192.168.4.22";
const uint16_t port = 80;

int btnPIN = 2  ;


void setup() {
  Serial.begin(921600);
  Serial.println();

  pinMode(btnPIN, INPUT_PULLUP);

  initWifi();
}

void initWifi(){
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid,pswd);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void sensorTrigger(){
  String payload = "GET /trigger HTTP/1.0" ;

  connectServer(payload);
}

void connectServer(String msg){
  Serial.print("connecting to ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);

  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    delay(5000);
    return;
  }

  // This will send a string to the server
  Serial.println("sending data to server");
  if (client.connected()) {
    client.println(msg);
  }


  // wait for data to be available
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 30000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      delay(10000);
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  Serial.println("receiving from remote server");
  // not testing 'client.connected()' since we do not need to send data here
  while (client.available()) {
    char ch = static_cast<char>(client.read());
    Serial.print(ch);
  }

  // Close the connection
  Serial.println();
  Serial.println("closing connection");
  client.stop();
}

void loop() {
  // put your main code here, to run repeatedly:

  int btnState = digitalRead(btnPIN);
  
  if( btnState == LOW){
    delay(100);
    sensorTrigger();
  }
}
