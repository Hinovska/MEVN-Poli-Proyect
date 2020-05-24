
/*********** LIBRERIAS **************/
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <EMGFilters.h>



/** EMG CONFIG **/
#define TIMING_DEBUG 1
#define SensorInputPin A0
EMGFilters emgFilter;
SAMPLE_FREQUENCY  sampleRate = SAMPLE_FREQ_1000HZ;
NOTCH_FREQUENCY  humFreq = NOTCH_FREQ_50HZ;
static int Threshold = 700;
unsigned long timeStamp;
unsigned long timeBudget;



/*********** MQTT CONFIG **************/

IPAddress mqttServer(35, 198, 1, 82);
const int mqttPort = 1883 ;
const char *topicSubscribe = "EMGcar/EMGMAO";
//const char *topicPublish = "EMGcar/NODE";
//const char *topicPublish = "EMGcar/ROBOTCAR";

/**PRUEBAS MQTT**/
const char *topicPublish = "EMGcar/Dash";

/*********** WIFICONFIG ***************/

const char* ssid = "MAO";
const char* password =  "MAO188393";

/*********** GLOBALES   ***************/

WiFiClient espClient;
PubSubClient client(espClient);
char msg[50];
const int EMG = A0;
const char* front;

/** F U N C I O N E S ***/

void reconnect();
void setup_wifi();
void envioMqTT();


/** SETUP ARDUINO ***/

void setup() {

  /** configuramos el filtro **/
  emgFilter.init(sampleRate, humFreq, true, true, true);

  Serial.begin(9600);

  /** se congifura el tiempo de ejecución del filtro usamos micros()**/
  timeBudget = 1e6 / sampleRate;

  /** nos conectamos al WIFI **/
  setup_wifi();

  /** conexión al Broker **/
  client.setServer(mqttServer, mqttPort);

}


/** LOOP ***/

void loop() {

  /** Reconexión al Broker **/
  if (!client.connected()) {
    reconnect();
  }

  /** Verificamos que estemos conectados al Broker **/
  if (client.connected()) {


    /**CAPTURA LA SEÑAL EMG PARA LUEGO ENVIAR POR MQTT**/

    timeStamp = micros();
    int Value = analogRead(SensorInputPin);
    int DataAfterFilter = emgFilter.update(Value);
    int envlope = sq(DataAfterFilter);
    envlope = (envlope > Threshold) ? envlope : 0;
    timeStamp = micros() - timeStamp;

    if (TIMING_DEBUG) {
      Serial.print("Squared Data: ");
      
      Serial.println(envlope);
      
      Serial.println(envlope);

      /** Envio a MQTT **/
      if (envlope > 10000
        front = "front";
        envioMqTT();
      }
             
      if (envlope <= 0 ) {
        front = "Stop";
        envioMqTT();
      }

      
    }
  }
  delayMicroseconds(500);
}



/***    CONEXION WIFI      ***/
void setup_wifi() {
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
      if (client.subscribe(topicSubscribe)) {
        Serial.println("Suscripcion ok");
      } else {
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

void envioMqTT() {

  /*** ENVIO A MQTT ***/
  Serial.println("Envio a Broker");
  snprintf (msg, 50, front);
  client.publish(topicPublish, msg);
  Serial.println("TOPIC PUBLICADO: ");
  Serial.println(topicPublish);
  Serial.println("MENSAJE: ");
  Serial.println(msg);
  delayMicroseconds(500);

}
