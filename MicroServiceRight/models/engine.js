const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mqtt = require("mqtt");

function ModelEngine(){
  let self = this;
  self.currentDir;
  self.direcctions = ['right'];
  self.fnStop = () => {
    let result = {status:'OK',message:'Stoped'};
    self.AgentMqtt.Send('EMGcar/Move',"Stop");
    return result;
  };
  self.fnChangeDirection = (toDirection) => {
    let result = {status:'OK',message:'Moving to ' + toDirection };
    switch (toDirection) {
      case 'front':
        self.AgentMqtt.Send('EMGcar/Move',toDirection);
        break;
      case 'backward':
        self.AgentMqtt.Send('EMGcar/Move',toDirection);
        break;
      case 'left':
        self.AgentMqtt.Send('EMGcar/Move',toDirection);
        break;
      case 'right':
        self.AgentMqtt.Send('EMGcar/Move',toDirection);
        break;
      default:
        result.status = 'Fail';
        result.message = 'Invalid direcction value';
      break;
    }
    return result;
  };
  self.fnTestMoves = () => {
    console.log('Start Test Engine');
    self.direcctions.map((dir)=>{
      console.log(self.fnChangeDirection(dir));
    });
    console.log(self.fnStop());
    console.log('Finish Test Engine');
    return true;
  };
  self.fnInit = () => {
    return self.AgentMqtt.Init() && self.fnTestMoves();
  };
  self.AgentMqtt = {
    mqtt_client: null,
    WebSocket_URL : 'ws://35.198.1.82:8083/mqtt',
    options : {
        connectTimeout:4000,
        clientId:'MSRight',
        keepalive:60,
        clean:true,
    },
    Init : function (){
      self.AgentMqtt.mqtt_client = mqtt.connect(self.AgentMqtt.WebSocket_URL, self.AgentMqtt.options);
      self.AgentMqtt.mqtt_client.on('connect', () => {
          ///qos Calidad de entrega Mensaje (0 )
          self.AgentMqtt.mqtt_client.subscribe('Response/RIGHT', { qos: 0 }, (error) => {
              if (!error) {
                  console.log('Mqtt conectado por ws - Done');
              }
              else{
                  console.log('Mqtt conectado por ws - Fail');
              }
          });
      });
      self.AgentMqtt.mqtt_client.on('message', (topic, message) => {
        console.log('Mensaje recibido:', topic, '->', message.toString());
      });
      return true;
    },
    Send: function(topic, message){
      self.AgentMqtt.mqtt_client.publish(topic, message, (error) => {
          console.log(error || 'Enviado a Broker: ',  topic , '->' , message);
      });
    }
  };
};

var model =  new ModelEngine();
model.fnInit();
exports = module.exports = model;
