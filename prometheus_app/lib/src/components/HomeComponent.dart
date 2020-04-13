import 'package:flutter/material.dart';

//my import
import 'BackgroundComponent.dart';

class HomeComponent extends StatefulWidget {
  @override
  HomeComponentState createState() => HomeComponentState();
}

class HomeComponentState extends State<HomeComponent> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: InkResponse(
        child: Stack(
          children: <Widget>[
            BackgroundComponent(),
            Container(
              alignment: Alignment.center,
              margin: EdgeInsets.only(top: 80.0),
              child: Column(
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.only(),
                    child: Text(
                      "PROMETHEUS",
                      style: const TextStyle(
                          fontFamily: 'PROMETHEUS',
                          fontSize: 40.0,
                          color: Colors.white,
                          fontWeight: FontWeight.w900),
                    ),
                  ),
                  Expanded(child: SizedBox()),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 50.0),
                    child: Text(
                      "ROBOTCAR",
                      style: const TextStyle(
                          fontFamily: 'PROMETHEUS',
                          fontSize: 30.0,
                          color: Colors.white,
                          fontWeight: FontWeight.w900),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
