/*let engineMoves = require("./models/engine");*/
const mongoose = require('mongoose');
const mqtt = require("mqtt");

function ModelAgent(){
  let self = this;
  self.Init = () => {
  self.dbAgent()
    return self.AgentMqtt.Init();
  };
  self.dbAgent = function fndbAgent(){
    console.log("Call dbAgent");
    let utlAtlas = 'mongodb+srv://politecnico:Poli123@cluster0-jsape.mongodb.net/test?retryWrites=true&w=majority';
    mongoose.connect(utlAtlas, {useNewUrlParser: true, connectTimeoutMS:120000})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));
    return true;
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
          self.AgentMqtt.mqtt_client.subscribe('EMGcar/Move', { qos: 0 }, (error) => {
              if (!error) {
                  console.log('Mqtt conectado por ws - Done  Topic: EMGcar/Move');
              }
              else{
                  console.log('Mqtt conectado por ws - Fail Topic: EMGcar/Move');
              }
          });
          self.AgentMqtt.mqtt_client.subscribe('EMGcar/NODE', { qos: 0 }, (error) => {
              if (!error) {
                  console.log('Mqtt conectado por ws - Done Topic: EMGcar/NODE');
              }
              else{
                  console.log('Mqtt conectado por ws - Fail Topic: EMGcar/NODE');
              }
          });
          //self.AgentMqtt.Send('Log','conexion broker exitosa');
      });
      self.AgentMqtt.mqtt_client.on('message', (topic, message) => {
        if (topic == "EMGcar/Move"){
          console.log('Mensaje recibido EMGcar/Move:', topic, '->', message.toString());
          /*var response = engineMoves.fnChangeDirection(message.toString());
          var sServer = message.toString().toUpperCase();*/
          /*if (response.status == "OK"){
            self.AgentMqtt.Send("EMGcar/ROBOTCAR", message.toString());
            self.AgentMqtt.Send("Response/" + sServer, response.message);
          }*/
        }
        else if (topic == "EMGcar/NODE"){
          console.log('Mensaje recibido EMGcar/NODE:', topic, '->', message.toString());
          self.AgentMqtt.Send("EMGcar/ROBOTCAR",'Device Send: ' +  message.toString());
        }
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
