import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class RigthButtonService extends StatefulWidget {
  @override
  _RigthButtonServiceState createState() => _RigthButtonServiceState();
}

class _RigthButtonServiceState extends State<RigthButtonService> {
  var data;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPress: () {
        setState(() {
          msRigth();
          print("Left");
        });
      },
      onTap: () {
        setState(() {
          msStopRigth();
          print("StopLeft");
        });
      },
      child: InkResponse(
        splashColor: Colors.yellow,
        highlightColor: Colors.blue.withOpacity(0.5),
        child: new Container(
          margin: const EdgeInsets.only(),
          decoration: const ShapeDecoration(
            color: Colors.lightBlue,
            shape: CircleBorder(),
          ),
          child: IconButton(
            icon: //Image.asset('lib/src/assets/images/RigthCircle.png',  alignment: Alignment.center,),
                Icon(
              Icons.chevron_right,
              color: Colors.white,
            ),
            color: Colors.white,
            onPressed: null,
            iconSize: 100.0,
            enableFeedback: true,
          ),
        ),
      ),
    );
  }

  msRigth() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://right-finyzlkrza-uc.a.run.app/move"),
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

  msStopRigth() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://right-finyzlkrza-uc.a.run.app/stop"),
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
