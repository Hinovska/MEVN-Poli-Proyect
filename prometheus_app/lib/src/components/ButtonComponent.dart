

import 'package:flutter/material.dart';

//my import
import '../services/BackButtonService.dart';
import '../services/FrontButtonService.dart';
import '../services/LeftButtonService.dart';
import '../services/RigthButtonService.dart';


class ButtonComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
      margin: const EdgeInsets.only(left: 60.0, right: 20.0, bottom: 50.0),
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          new Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [FrontButtonService(), BackButtonService(),],
          ),
          new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              new Row(
                children: [LeftButtonService(),  RigthButtonService()],
              )
              
            ],
          )
        ],
      ),
    );
  }

}
