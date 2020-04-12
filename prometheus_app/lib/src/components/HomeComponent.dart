import 'package:flutter/material.dart';

//my import
import 'BackgroundComponent.dart';
import 'ButtonLedComponent.dart';

class HomeComponent extends StatefulWidget {
  HomeComponent({Key key, this.title}) : super(key: key);


  final String title;

  @override
  HomeComponentState createState() => HomeComponentState();
}

class HomeComponentState extends State<HomeComponent> {
  bool led = false;

  void toggleLed() {
    setState(() {
      led = !led;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: <Widget>[
          BackgroundComponent(),
          Container(
            alignment: Alignment.center,
            margin: EdgeInsets.only(top: 80.0),
            child: Column(
              children: <Widget>[
                Text(
                  "PROMETHEUS",
                  style: const TextStyle(
                      fontFamily: 'PROMETHEUS',
                      fontSize: 35.0,
                      color: Colors.white70,
                      fontWeight: FontWeight.w600),
                ),
                ButtonLedComponent(this)
              ],
            ),
          )
        ],
      ),
    );
  }
}
