#include <ESP8266WiFi.h>
//#include "heltec.h"/

#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif


const char* ssid     = STASSID;
const char* password = STAPSK;

const char* host = "192.168.1.32";
const uint16_t port = 80;

int btnState = 0;


void setup() {
  // put your setup code here, to run once:
//  Heltec.begin(true, true);
//  Heltec.display -> init();
//  Heltec.display->flipScreenVertically();
//  Heltec.display->setFont(ArialMT_Plain_10);
//  
//  Heltec.display -> clear();
  
  Serial.begin(74880);
  Serial.println();

  pinMode(0, INPUT_PULLUP);
  pinMode(5, OUTPUT);
  digitalWrite(5, HIGH);

  initWifi();
}

void initWifi(){
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

//  Heltec.display -> drawString(0,0, "Connected to ");
//  Heltec.display -> drawString(1,0, ssid);
//  Heltec.display -> display();
}

void sensorTrigger(){
//  Heltec.display -> clear();
//  Heltec.display -> drawString(0,0,"Sensor Triggered!");
//  Heltec.display -> drawString(0,9,"Sending to Server.");
//  Heltec.display -> display();
//  
  String payload = "GET /trigger HTTP/1.0" ;

  connectServer(payload);


  //Code to run after sending payload trigger relay
  
  //pin for relay
  int relay = 5;
  digitalWrite(relay, LOW);
  delay(5000);

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
    if (millis() - timeout > 10000) {
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
//  Heltec.display -> clear();
//  Heltec.display -> drawString(0,0,"Waiting for sensor trigger.");
//  Heltec.display -> display();

  btnState = digitalRead(2);
  
  if( btnState == LOW){
    delay(100);
    sensorTrigger();
    digitalWrite(5, HIGH);
  }
}
