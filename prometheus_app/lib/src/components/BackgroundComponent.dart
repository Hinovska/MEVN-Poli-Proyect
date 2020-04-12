
import 'package:flutter/material.dart';

//my import 
import 'ButtonComponent.dart';

class BackgroundComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        GradientBack(),
         Positioned(bottom: 30.0, child: ButtonComponent())
      ],
    );
  }
}

class GradientBack extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return  Container(
      decoration:  BoxDecoration(
        gradient:  LinearGradient(colors: [
          Color.fromRGBO(14, 14, 82, 1),
          Color.fromRGBO(25, 43, 194, 1),
        ], begin: Alignment.topLeft, end: Alignment.bottomRight),
      ),
    );
  }
}
