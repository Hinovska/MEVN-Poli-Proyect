import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class FrontButtonService extends StatefulWidget {
  @override
  _FrontButtonServiceState createState() => _FrontButtonServiceState();
}

class _FrontButtonServiceState extends State<FrontButtonService> with SingleTickerProviderStateMixin {
  var data;
  double opacity = 1.0;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (e) {
        opacity = .5;
        setState(() {
          msFront();
          print("Front");
        });
      },
      onTap: () {
        setState(() {
          opacity = 1.0;
          msStopFront();
          print("Stop Front");
        });
      },
      child: InkResponse(
          child: AnimatedOpacity(
        opacity: opacity,
        duration: Duration(milliseconds: 500),
        child: new Container(
          margin: const EdgeInsets.only(),
          decoration: const ShapeDecoration(
            color: Colors.lightBlue,
            shape: CircleBorder(),
          ),
          child: IconButton(
            icon: //Image.asset('lib/src/assets/images/FrontCircle.png',  alignment: Alignment.center,),
                Icon(
              Icons.expand_less,
              color: Colors.white,
            ),
            color: Colors.white,
            onPressed: null,
            iconSize: 100.0,
            enableFeedback: true,
          ),
        ),
      )),
    );
  }

  msFront() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://front-finyzlkrza-uc.a.run.app/move"),
        headers: {"Accept": "aplication/json"});
    print(response.body);
    data = json.decode(response.body);

    if (data["status"] == "OK") {
      Scaffold.of(context).showSnackBar(SnackBar(
        content: Text('Success! ' + data["message"]),
      ));
    }
    return "Success!";
  }

  msStopFront() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://front-finyzlkrza-uc.a.run.app/stop"),
        headers: {"Accept": "aplication/json"});
    print(response.body);
    data = json.decode(response.body);

    if (data["status"] == "OK") {
      Scaffold.of(context).showSnackBar(SnackBar(
        content: Text('Success! ' + data["message"]),
      ));
    }
    return "Success!";
  }
}
