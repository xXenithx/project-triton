#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#define STASSID "ESPNET"

//Wifi Name variable
const char* ssid = STASSID;

//Creates an WebServer Instance to listen on port 80
ESP8266WebServer server(80);

//Used to establish a IP address for server
IPAddress local_IP(192,168,4,22);
IPAddress gateway(192,168,4,9);
IPAddress subnet(255,255,255,0);


void handleRoot(){
  server.send(200, "text/plain", "At Root Page,\nNothing To Do Here.");
}

void handleTrigger(){
  String message = "Trigger recieved, now sending to motor!";
  server.send(200, "text/plain", message);
  Serial.println("Recieved trigger now turning on relay");

  //Code to handle relay
  //Pin to write the data to relay
  digitalWrite(15, LOW);
  delay(5000);
  digitalWrite(15, HIGH);
}


void handleNotFound() {
  Serial.println("Handling NOT FOUND");
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  
  server.send(404, "text/plain", message);
}


void setup() {
  // put your setup code here, to run once:
  
  //Setup Serial Monitor and Pins
  Serial.begin(74880);
  pinMode(15, OUTPUT);
  digitalWrite(15, HIGH);

  //Setup Wifi Broadcast Connection
  Serial.println('Setting Up WiFi Network Configuration');
  Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "Ready" : "Failed");
  Serial.println("Setting up WiFi Network");
  Serial.println(WiFi.softAP(ssid) ? "Ready" : "Failed");
  Serial.print("Wifi Network Address = ");
  Serial.println(WiFi.softAPIP());

  //Routing and Web Server Setup
  server.on("/", handleRoot);
  server.on("/trigger", handleTrigger);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("HTTP Server Started");
}

void loop(){
  //Listens for incoming requests
  server.handleClient();
}
