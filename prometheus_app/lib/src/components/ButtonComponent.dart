import 'package:flutter/material.dart';

//my import
import '../services/BackButtonService.dart';
import '../services/FrontButtonService.dart';
import '../services/LeftButtonService.dart';
import '../services/RigthButtonService.dart';

class ButtonComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(bottom: 10.0),
            child: FrontButtonService(),
          ),
          
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              new Padding(
                padding: const EdgeInsets.only(),
                child: LeftButtonService(),
              ),
              new Padding(
                padding: const EdgeInsets.only(),
                child: _buttonCenter(),
              ),
              new Padding(
                padding: const EdgeInsets.only(),
                child: RigthButtonService(),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(top: 10.0),
            child: BackButtonService(),
          ),
        ],
      ),
    );
  }

  _buttonCenter() {
    return InkResponse(
      child: new Container(
        margin: const EdgeInsets.only(),
        height: 100.0,
        width: 100.0,
        decoration: new BoxDecoration(
          gradient: new LinearGradient(colors: [
            Color.fromRGBO(20, 20, 118, 1),
            Color.fromRGBO(8, 8, 48, 1),
          ], begin: Alignment.topLeft, end: Alignment.bottomRight),
          borderRadius: new BorderRadius.circular(200.0),
        ),
        child: new Container(
          margin: new EdgeInsets.only(
              top: 15.0, left: 15.0, right: 15.0, bottom: 15.0),
          decoration: new BoxDecoration(
              gradient: new LinearGradient(colors: [
                Color.fromRGBO(8, 8, 48, 1),
                Color.fromRGBO(20, 20, 118, 1),
              ], begin: Alignment.topLeft, end: Alignment.bottomRight),
              borderRadius: new BorderRadius.circular(200.0),
              border: Border.all(
                  width: 2.0, color: Color.fromRGBO(68, 157, 209, 1))),
          child: new Container(
            margin: new EdgeInsets.only(
                top: 10.0, left: 10.0, right: 10.0, bottom: 10.0),
            decoration: new BoxDecoration(
              color: Colors.lightBlue,
              borderRadius: new BorderRadius.circular(200.0),
            ),
          ),
        ),
      ),
    );
  }
}
