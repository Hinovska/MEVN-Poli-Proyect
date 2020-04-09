import 'package:flutter/material.dart';
import 'package:app/ControlButtons.dart';

class Background extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Stack(
      children: [
        GradientBack(),
        new Positioned(bottom: 30.0, child: ControlButtons())
      ],
    );
  }
}

class GradientBack extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Container(
      decoration: new BoxDecoration(
        gradient: new LinearGradient(colors: [
          Color.fromRGBO(14, 14, 82, 1),
          Color.fromRGBO(25, 43, 194, 1),
        ], begin: Alignment.topLeft, end: Alignment.bottomRight),
      ),
    );
  }
}