import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LeftButtonService extends StatefulWidget {
  @override
  _LeftButtonServiceState createState() => _LeftButtonServiceState();
}

class _LeftButtonServiceState extends State<LeftButtonService> with SingleTickerProviderStateMixin {
  var data;
  double opacity = 1.0;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (o) {
        setState(() {
          opacity = .5;
          msLeft();
          print("Left");
        });
      },
      onTap: () {
        setState(() {
          opacity = 1.0;
          msStopLeft();
          print("StopLeft");
        });
      },
      child: InkWell(
        child: new AnimatedOpacity(opacity: opacity,
         duration: Duration(milliseconds: 500),
         child: new Container(
          margin: const EdgeInsets.only(),
          decoration: const ShapeDecoration(
            color: Colors.lightBlue,
            shape: CircleBorder(),
          ),
          child: IconButton(
            icon: //Image.asset('lib/src/assets/images/LeftCircle.png',  alignment: Alignment.center,),
                Icon(
              Icons.chevron_left,
              color: Colors.white,
            ),
            color: Colors.white,
            onPressed: null,
            iconSize: 100.0,
            enableFeedback: true,
          ),
        ),
         ),
        
        
        
        
      ),
    );
  }

  msLeft() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://left-finyzlkrza-uc.a.run.app/move"),
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

  msStopLeft() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://left-finyzlkrza-uc.a.run.app/stop"),
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
