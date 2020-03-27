let engineMoves = require("./models/engine");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mqtt = require("mqtt");

function ModelAgent(){
  let self = this;
  self.Init = () => {return self.AgentMqtt.Init()};
  self.dbAgent = async function fndbAgent(){
    console.log("Call dbAgent");
      /**
       * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
       * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
       */
      const uri = "mongodb+srv://PrometheusApp:Poli123@prometheusteam-oabpa.gcp.mongodb.net/Rigth?retryWrites=true&w=majority";
      //mongodb+srv://<username>:<password>@cluster0-jsape.mongodb.net/test
      const client = new MongoClient(uri);
      try {
          console.log(client);
          // Connect to the MongoDB cluster
          await client.connect();
          // Make the appropriate DB calls
          await self.ListBD(client);
      } catch (e) {
          //console.log("Call dbAgent Error");
          console.error(e);
      } finally {
          await client.close();
      }
  };
  self.ListBD = async function fnListBD(client){
      console.log("Call ListBD");
      databasesList = await client.db().admin().listDatabases();
      console.log("Databases:");
      databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  self.dbTeam = function fndbTeam (){
    const uri = "mongodb+srv://PrometheusApp:Poli123@prometheusteam-oabpa.gcp.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
    console.log("Call dbTeam");
  };
  self.AgentMqtt = {
    mqtt_client: null,
    WebSocket_URL : 'ws://35.198.1.82:8083/mqtt',
    options : {
        connectTimeout:4000,
        clientId:'MSIntegrator',
        keepalive:60,
        clean:true,
    },
    Init : function (){
      self.AgentMqtt.mqtt_client = mqtt.connect(self.AgentMqtt.WebSocket_URL, self.AgentMqtt.options);
      self.AgentMqtt.mqtt_client.on('connect', () => {
          ///qos Calidad de entrega Mensaje (0 )
          self.AgentMqtt.mqtt_client.subscribe('Move', { qos: 0 }, (error) => {
              if (!error) {
                  console.log('Mqtt conectado por ws - Done');
              }
              else{
                  console.log('Mqtt conectado por ws - Fail');
              }
          });
          //self.AgentMqtt.Send('Log','conexion broker exitosa');
      });
      self.AgentMqtt.mqtt_client.on('message', (topic, message) => {
        if (topic == "Move"){
          var response = engineMoves.fnChangeDirection(message.toString());
          if (response.status == "OK"){
            self.AgentMqtt.Send("Response", response.message);
          }
        }
        console.log('mensaje recibido:', topic, '->', message.toString());
      });
      return true;
    },
    Send: function(topic, message){
      self.AgentMqtt.mqtt_client.publish(topic, message, (error) => {
          console.log(error || 'Mensaje enviado a ', self.AgentMqtt.WebSocket_URL, " : " ,  topic , '->' , message);
      });
    }
  };
}

let integrator = new ModelAgent();
integrator.Init()
