const mqtt = require("mqtt");

const { conect } = require("../config/conectDB");

const modelMove = require("./modelMove");

function ModelEngine() {
  let self = this;
  self.currentDir;
  self.direcctions = ["right"];
  self.fnStop = () => {
    let result = { status: "OK", message: "Stoped" };
    self.Send("EMGcar/Move", "Stop");
    return result;
  };
  self.fnChangeDirection = (toDirection) => {
    let result = { status: "OK", message: "Moving to " + toDirection };
    switch (toDirection) {
      case "front":
        self.Send("EMGcar/Move", toDirection);
        break;
      case "backward":
        self.Send("EMGcar/Move", toDirection);
        break;
      case "left":
        self.Send("EMGcar/Move", toDirection);
        break;
      case "right":
        self.Send("EMGcar/Move", toDirection);
        break;
      default:
        result.status = "Fail";
        result.message = "Invalid direcction value";
        break;
    }
    return result;
  };
  self.fnTestMoves = () => {
    console.log("Start Test Engine");
    self.direcctions.map((dir) => {
      console.log(self.fnChangeDirection(dir));
    });
    console.log(self.fnStop());
    console.log("Finish Test Engine");
    return true;
  };
  self.fnInit = () => {
    conect;
    return self.conectMqtt() /** && self.fnTestMoves()*/;
  };

  /**registro a DB*/
  self.RegisterMove = (data) => {
    var rigthModel = new modelMove({ move: data });
    rigthModel.save(function (error) {
      if (error) {
        console.log("Se repesento un error: ", error);
      } else {
        console.log("Registro a DB: ", data);
      }
    });
  };

  /**Conexión a MQTT */
  self.conectMqtt = async () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    self.mqtt_client = await mqtt.connect("ws://35.198.1.82:8083/mqtt", {
      clientId: "MSRight" + randomColor,
    });
    self.Subscribe();
  };

  /**Subscribe MQTT */
  self.Subscribe = () => {
    self.mqtt_client.subscribe("Response/RIGHT", { qos: 0 }, (error) => {
      if (!error) {
        console.log("Mqtt conectado por ws - Done  Topic: Response/RIGHT");
      } else {
        console.log("Mqtt conectado por ws - Fail MAO Topic: Response/RIGHT");
      }
    });
    /**CallBack MQTT */
    self.mqtt_client.on("message", (topic, message) => {
      console.log("Mensaje recibido:", topic, "->", message.toString());
    });
  };

  /**Publisher MQTT */
  self.Send = (topic, message) => {
    self.mqtt_client.publish(topic, message, (error) => {
      console.log(error || "Enviado a Broker: ", topic, "->", message);
    });

    /**Llama a Registro a Mongo DB*/
    if (message == "right") {
      self.RegisterMove(message);
    }
  };
}

var model = new ModelEngine();
model.fnInit();
exports = module.exports = model;
