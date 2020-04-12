

import 'package:flutter/material.dart';


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
            children: [_frontButton(), _backButton(),],
          ),
          new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              new Row(
                children: [_leftButton(), _rigthButton()],
              )
            ],
          )
        ],
      ),
    );
  }

  Widget _frontButton() {
    
    return InkWell(
      child: new Container(
        margin: const EdgeInsets.only(top: 20.0),
        decoration: const ShapeDecoration(
          color: Colors.lightBlue,
          shape: CircleBorder(),
        ),
        child: IconButton(
          icon: Icon(Icons.expand_less),
          color: Colors.white,
          onPressed: () {
            print("Front");
          },
          iconSize: 60.0,
          
        ),
      ),
      onTap: () {
        print("Front...");
      },
    );
  }

  Widget _backButton() {
    return InkWell(
      child: new Container(
        margin: const EdgeInsets.only(top: 20.0),
        decoration: const ShapeDecoration(
          color: Colors.lightBlue,
          shape: CircleBorder(),
        ),
        child: IconButton(
          icon: Icon(Icons.expand_more),
          color: Colors.white,
          onPressed: () {
            print("Back");
          },
          iconSize: 60.0,
        ),
      ),
      onTap: () {
        print("Back...");
      },
    );
  }

  Widget _leftButton() {
    return InkWell(
      child: new Container(
        margin: const EdgeInsets.only(left: 30.0),
        decoration: const ShapeDecoration(
          color: Colors.lightBlue,
          shape: CircleBorder(),
        ),
        child: IconButton(
          icon: Icon(Icons.chevron_left),
          color: Colors.white,
          onPressed: () {
            print("Left");
          },
          iconSize: 60.0,
        ),
      ),
      onTap: () {
        print("Left...");
      },
    );
  }

  Widget _rigthButton() {
    return InkWell(
      child: new Container(
          margin: const EdgeInsets.only(left: 20.0),
          decoration: const ShapeDecoration(
            color: Colors.lightBlue,
            shape: CircleBorder(),
          ),
          child: IconButton(
            icon: Icon(Icons.chevron_right),
            color: Colors.white,
            onPressed: () {
              print("Rigth");
            },
            iconSize: 60.0,
          )),
      onTap: () {
        print("Rigth...");
      },
    );
  }
}
