#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#ifndef STASSID
#define STASSID "The Nest"
#define STAPSK  "DrysbrBiiRlP@6v$"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;


const int statusLED = 5;

ESP8266WebServer server(80);


void handleRoot(){
  digitalWrite(statusLED, HIGH);
  server.send(200, "text/plain", "At Root Page,\nNothing To Do Here.");
  digitalWrite(statusLED, LOW);
}

void handleTrigger(){
  digitalWrite(statusLED, HIGH);
  String message = "Trigger recieved, now sending to motor!";
  
  server.send(200, "text/plain", message);
  digitalWrite(statusLED, LOW);
}


void handleNotFound() {
  Serial.println("Handling NOT FOUND");
  
  digitalWrite(statusLED, HIGH);
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
  digitalWrite(statusLED, LOW);
}


void setup() {
  // put your setup code here, to run once:
  
  pinMode(statusLED, OUTPUT);
  digitalWrite(statusLED, LOW);
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  //Routing

  server.on("/", handleRoot);
  server.on("/trigger", handleTrigger);
  server.onNotFound(handleNotFound);


  server.begin();
  Serial.println("HTTP Server Started");
}

void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient();
  MDNS.update();
}
