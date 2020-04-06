  
/*********** LIBRERIAS **************/
#include <ESP8266WiFi.h>
#include <PubSubClient.h>


/*********** MQTT CONFIG **************/

/*const char *mqttServer = "ioticos.org";*/
IPAddress mqttServer(35, 198, 1, 82);
const int mqttPort = 1883 ;
/*const char *mqttUser = "gbkJWdnq5J60Qdy";
const char *mqttPass = "GO6XUzcSK98uJtJ";*/
const char *topicSubscribe = "EMGcar/EMG";
const char *topicPublish = "EMGcar/NODE";

/*********** WIFICONFIG ***************/

const char* ssid = "MAO";
const char* password =  "MAO188393";

/*********** GLOBALES   ***************/

WiFiClient espClient;
PubSubClient client(espClient);
char msg[50];



/** F U N C I O N E S ***/

void callback(char* topic, byte* payload, unsigned int length);
void reconnect();
void setup_wifi();


/** SETUP ARDUINO ***/

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  
}


/** LOOP ***/

void loop() {
  
  if (!client.connected()) {
    reconnect();
  }

  if (client.connected()){

    /*** ENVIO A MQTT ***/
    
    Serial.println("Envio a Broker");
    snprintf (msg, 50, "right");
    client.publish(topicPublish, msg);
    Serial.println("TOPIC PUBLICADO: ");
    Serial.println(topicPublish);
    Serial.println("MENSAJE: ");
    Serial.println(msg);
    delay(1000);
  }

 
}




/***    CONEXION WIFI      ***/
void setup_wifi(){
  delay(10);
  // Nos conectamos a nuestra red Wifi
  Serial.println();
  Serial.print("Conectando a red WIFI!: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("..CONECTANDO..");
  }

  Serial.println("");
  Serial.println("Conexión exitosa a su red WiFi!");
  Serial.println("Dirección IP asignada: ");
  Serial.println(WiFi.localIP());
}




/***    CONEXION MQTT      ***/

void reconnect() {

  while (!client.connected()) {
    Serial.print("Intentando conexión Mqtt...");
    /* Creamos un cliente ID */ 
    String clientId = "EMG";
    clientId += String(random(0xffff), HEX);
    // Intentamos conectar
    if (client.connect(clientId.c_str())) {
      Serial.println("Conectado!");
      /* Nos suscribimos */
      if(client.subscribe(topicSubscribe)){
        Serial.println("Suscripcion ok");
      }else{
        Serial.println("fallo Suscripciión");
      }
    } else {
      Serial.print("falló :( con error -> ");
      Serial.print(client.state());
      Serial.println(" Intentamos de nuevo en 5 segundos");
      delay(5000);
    }
  }
}
