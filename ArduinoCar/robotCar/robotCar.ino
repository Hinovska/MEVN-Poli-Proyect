
/*******ASIGNACIÓN PINES PARA PLACA NodeMCU LOLIN********/

#define ENA   D5          // Enable/speed motores Right        
#define ENB   D6          // Enable/speed motores Left         
#define IN_1  D8          // L298N in1 motores Right           
#define IN_2  D7          // L298N in2 motores Right          
#define IN_3  D4          // L298N in3 motores Left            
#define IN_4  D3          // L298N in4 motores Left            
#define ligthFront  D2    // Luz Frontal                       
#define ligthBack   D1    // Luz Stop                          
#define flashingDer  D10  // Luz direccionales derecha      
#define flashingIzq  D9   // Luz direccionales Izquierda 


/*********** LIBRERIAS **************/
#include <ESP8266WiFi.h>
#include <PubSubClient.h>


/*********** MQTT CONFIG **************/

/*const char *mqttServer = "ioticos.org";*/
IPAddress mqttServer(35, 198, 1, 82);
const int mqttPort = 1883 ;
/*const char *mqttUser = "gbkJWdnq5J60Qdy";
const char *mqttPass = "GO6XUzcSK98uJtJ";*/
const char *topicSubscribe = "EMGcar/ROBOTCAR";
const char *topicPublish = "EMGcar/NODE";

/*********** WIFICONFIG ***************/

const char* ssid = "MAO";
const char* password =  "MAO188393";

/*********** GLOBALES   ***************/

WiFiClient espClient;
PubSubClient client(espClient);
char msg[50];
int speedCar = 800;         // 400 - 1023.
int speed_Coeff = 3;




/** F U N C I O N E S ***/

void callback(char* topic, byte* payload, unsigned int length);
void reconnect();
void setup_wifi();
void adelante();
void atras();
void derecha();
void izquierda();
void adelanteDer();
void adelanteIzq();
void atrasDer();
void atrasIzq();
void stopCarro();


/** SETUP ARDUINO ***/

void setup() {
  Serial.begin(115200);

  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN_1, OUTPUT);
  pinMode(IN_2, OUTPUT);
  pinMode(IN_3, OUTPUT);
  pinMode(IN_4, OUTPUT);
  pinMode(ligthFront, OUTPUT);
  pinMode(ligthBack, OUTPUT);
  pinMode(flashingDer, OUTPUT);
  pinMode(flashingIzq, OUTPUT);

  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}


/** LOOP ***/

void loop() {

  if (!client.connected()) {
    reconnect();
  }

  /*** CLIENTE MQTT A LA ESCUCHA ***/
  client.loop();
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
    String clientId = "ROBOTCAR";
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



/***       CALLBACK        ***/
/*******ESCUCHA LO QUE SE ENVIA POR EL TOPIC*******/

void callback(char* topic, byte* payload, unsigned int length) {
  String incoming = "";
  Serial.print("Mensaje recibido desde -> ");
  Serial.print(topic);
  Serial.println("");
  for (int i = 0; i < length; i++) {
    incoming += (char)payload[i];
  }
  incoming.trim();
  Serial.println("Mensaje -> " + incoming);

  Serial.println("Char -> " + (char)incoming[0]);

  
/****** MOVIMIENTOS CARRO*******/
 switch ((char)incoming[0]) {
    case 'f': adelante(); break;
    case 'b': atras(); break;
    case 'r': derecha(); break;
    case 'l': izquierda(); break;
    /*case (incoming == "frontR"): adelanteDer(); break;
    case (incoming == "frontL"): adelanteIzq(); break;
    case (incoming == "backwardR"): atrasDer(); break;
    case (incoming == "backwardL"): atrasIzq(); break;*/
    case 's': stopCarro(); break;

  }
}



/*********MOVIMIENTOS CARRITO************/

void adelante() {

  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, HIGH);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
  analogWrite(ENB, speedCar);

  controlLigth('F');
}

void atras() {

  digitalWrite(IN_1, HIGH);
  digitalWrite(IN_2, LOW);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, HIGH);
  digitalWrite(IN_4, LOW);
  analogWrite(ENB, speedCar);

  controlLigth('B');

}

void derecha() {

  digitalWrite(IN_1, HIGH);
  digitalWrite(IN_2, LOW);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
  analogWrite(ENB, speedCar);

  controlLigth('R');
}

void izquierda() {

  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, HIGH);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, HIGH);
  digitalWrite(IN_4, LOW);
  analogWrite(ENB, speedCar);

  controlLigth('L');
}

void adelanteDer() {

  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, HIGH);
  analogWrite(ENA, speedCar / speed_Coeff);

  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
  analogWrite(ENB, speedCar);

  controlLigth('R');
}

void adelanteIzq() {

  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, HIGH);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
  analogWrite(ENB, speedCar / speed_Coeff);

  controlLigth('L');
}

void atrasDer() {

  digitalWrite(IN_1, HIGH);
  digitalWrite(IN_2, LOW);
  analogWrite(ENA, speedCar / speed_Coeff);

  digitalWrite(IN_3, HIGH);
  digitalWrite(IN_4, LOW);
  analogWrite(ENB, speedCar);

  controlLigth('R');
}

void atrasIzq() {

  digitalWrite(IN_1, HIGH);
  digitalWrite(IN_2, LOW);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, HIGH);
  digitalWrite(IN_4, LOW);
  analogWrite(ENB, speedCar / speed_Coeff);

  controlLigth('L');
}

void stopCarro() {

  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, LOW);
  analogWrite(ENA, speedCar);

  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, LOW);
  analogWrite(ENB, speedCar);

  controlLigth('S');
}



/**** CONTROL LUCES ****/
void controlLigth(char param)
{

 Serial.println("CONTROL LUCES: " + param );

  switch (param) {
    case 'F': digitalWrite(ligthFront, HIGH); break;
    case 'B': digitalWrite(ligthBack, HIGH); break;
    case 'R': digitalWrite(flashingDer, HIGH); break;
    case 'L': digitalWrite(flashingIzq, HIGH); break;
    case 'S':

      digitalWrite(ligthFront, LOW);
      digitalWrite(ligthBack, LOW);
      digitalWrite(flashingDer, LOW);
      digitalWrite(flashingIzq, LOW);
      break;
  }
}
