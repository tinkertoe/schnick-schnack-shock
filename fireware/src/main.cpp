#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <DNSServer.h>
#include <WebSocketsClient.h>
#include <ESP_DoubleResetDetector.h>

#define AP_PASSWORD "tinkertoe"
#define SERVER_ADDRESS "192.168.43.219"
#define SERVER_PORT 18769
#define SHOCKER_ID "right"
#define SHOCK_TIME 200
#define TRIGGER_PIN 14
#define RESET_TIMEOUT 1000
#define RESET_ADDRESS 0

WebSocketsClient webSocket;
int shockTime = 0;

void setupWifi() {
  WiFiManager wifiManager;
  wifiManager.setDebugOutput(true);

  DoubleResetDetector* resetDetector = new DoubleResetDetector(RESET_TIMEOUT / 1000, RESET_ADDRESS);

  Serial.println("- checking for double reset");
  if (resetDetector->detectDoubleReset()) {
    Serial.println();
    Serial.println();
    Serial.println("[ RESET ]");
    Serial.println();
    wifiManager.resetSettings();
  }

  delay(RESET_TIMEOUT);
  Serial.println("- check over");
  resetDetector->stop();

  Serial.println("- starting WiFiManager");
  wifiManager.autoConnect("dispo-shocker", AP_PASSWORD);

  Serial.println("- connected to network");
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type)
  {
    case WStype_DISCONNECTED:
      Serial.println("- disconnected from server");
      break;

    case WStype_CONNECTED:
      Serial.println("- connected to server");
      break;

    case WStype_TEXT:
      Serial.println(String((char *)payload));
      if (String((char *)payload) == SHOCKER_ID) {
        Serial.println("- shocking...");
        shockTime = SHOCK_TIME;
      }
      break;
    
    default:
      break;
  }
}

void setup() {
  Serial.begin(9600);
  Serial.println();
  Serial.println();
  Serial.println("[ dispo-shocker // v0.0.1 ]");
  Serial.println();

  setupWifi();
  
  pinMode(TRIGGER_PIN, OUTPUT);

  webSocket.begin(SERVER_ADDRESS, SERVER_PORT, "/");
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop() {
  webSocket.loop();
  if (shockTime > 0) {
    digitalWrite(TRIGGER_PIN, HIGH);
    delay(shockTime);
    digitalWrite(TRIGGER_PIN, LOW);
    shockTime = 0;
  }
}