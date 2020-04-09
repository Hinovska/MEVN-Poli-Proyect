import 'package:flutter/material.dart';
import 'package:app/Background.dart';
import 'package:app/ButtonLed.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  bool led = false;

  void toggleLed() {
    setState(() {
      led = !led;
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build

    return new Scaffold(
      body: new Stack(
        children: <Widget>[
          new Background(),
          new Container(
            alignment: Alignment.center,
            margin: new EdgeInsets.only(top: 80.0),
            child: new Column(
              children: <Widget>[
                new Text(
                  "Prometheus",
                  style: const TextStyle(
                      fontSize: 35.0,
                      color: Colors.white70,
                      fontWeight: FontWeight.w600),
                ),
                ButtonLed(this)
              ],
            ),
          )
        ],
      ),
    );
  }
}