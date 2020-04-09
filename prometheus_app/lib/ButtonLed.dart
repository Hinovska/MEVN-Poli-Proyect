import 'package:flutter/material.dart';
import 'package:app/HomePage.dart' show HomePageState;

class ButtonLed extends StatelessWidget{
  HomePageState parent;

  String _ledText(){
    return this.parent.led ? "Off" : "On";
  }

  ButtonLed(this.parent);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build

    return new InkWell(
      onTap: (){
        this.parent.setState(() {
          this.parent.toggleLed();
        });
      },
      child: new Container(
        margin: new EdgeInsets.only(
          top: 20.0,
          left: 20.0,
          right: 20.0,
        ),
        height: 250.0,
        width: 250.0,
        decoration: new BoxDecoration(
          gradient: new LinearGradient(
              colors: [
                Color.fromRGBO(20,20,118,1),
                Color.fromRGBO(8,8,48,1),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight
          ),
          borderRadius: new BorderRadius.circular(200.0),
        ),
        child: new Container(
          margin: new EdgeInsets.only(
              top: 30.0,
              left: 30.0,
              right: 30.0,
              bottom: 30.0
          ),
          height: 200.0,
          width: 200.0,
          decoration: new BoxDecoration(
              gradient: new LinearGradient(
                  colors: [
                    Color.fromRGBO(8,8,48,1),
                    Color.fromRGBO(20,20,118,1),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight
              ),
              borderRadius: new BorderRadius.circular(200.0),
              border: Border.all(width: 2.0, color: Color.fromRGBO(68, 157, 209, 1))
          ),

          child: new Container(
            margin: new EdgeInsets.only(
                top: 20.0,
                left: 20.0,
                right: 20.0,
                bottom: 20.0
            ),
            height: 200.0,
            width: 200.0,
            //color: this.parent.led ? Colors.lightBlue : Colors.black,
            decoration: new BoxDecoration(
              color: this.parent.led ? Colors.lightBlue : Color.fromRGBO(8,8,48,1),
              borderRadius: new BorderRadius.circular(200.0),
            ),
            child: new Container(
              margin: EdgeInsets.only(
                  top: 55.0
              ),
              child: new Column(

                children: <Widget>[
                  new Text(
                    _ledText(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                        fontSize: 25.0,
                        color: Colors.white,
                        fontWeight: FontWeight.w600
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}