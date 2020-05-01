//const mongoose = require('mongoose');
const mqtt = require("mqtt");

function ModelAgent() {
  let self = this;
  self.Init = () => {
    //self.dbAgent()
    return self.conectMqtt();
  };

  self.conectMqtt = async () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    self.mqtt_client = await mqtt.connect("ws://35.198.1.82:8083/mqtt", {
      clientId: "MSIntegrator" + randomColor,
    });
    self.Subscribe();
  };

  /**Subscribe MQTT */
  self.Subscribe = () => {
    self.mqtt_client.subscribe("EMGcar/Move", { qos: 0 }, (error) => {
      if (!error) {
        console.log("Mqtt conectado por ws - Done  Topic: EMGcar/Move");
      } else {
        console.log("Mqtt conectado por ws - Fail MAO Topic: EMGcar/Move");
      }
    });

    self.mqtt_client.subscribe("EMGcar/NODE", { qos: 0 }, (error) => {
      if (!error) {
        console.log("Mqtt conectado por ws - Done  Topic: EMGcar/NODE");
      } else {
        console.log("Mqtt conectado por ws - Fail MAO Topic: EMGcar/NODE");
      }
    });
    /**CallBack MQTT */
    self.mqtt_client.on("message", (topic, message) => {
      if (topic == "EMGcar/Move") {
        console.log(
          "Mensaje recibido EMGcar/Move:",
          topic,
          "->",
          message.toString()
        );
        self.Send("EMGcar/ROBOTCAR", message.toString());
      } else if (topic == "EMGcar/NODE") {
        console.log(
          "Mensaje recibido EMGcar/NODE:",
          topic,
          "->",
          message.toString()
        );
        self.Send("EMGcar/ROBOTCAR", "Device Send: " + message.toString());
      }
    });
  };

  /**Publisher MQTT */
  self.Send = (topic, message) => {
    self.mqtt_client.publish(topic, message, (error) => {
      console.log(error || "Enviado a Broker: ", topic, "->", message);
    });
  };
}

let integrator = new ModelAgent();
integrator.Init();
