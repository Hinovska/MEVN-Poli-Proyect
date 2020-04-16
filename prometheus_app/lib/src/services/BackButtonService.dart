import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class BackButtonService extends StatefulWidget {
  @override
  _BackButtonServiceState createState() => _BackButtonServiceState();
}

class _BackButtonServiceState extends State<BackButtonService> with SingleTickerProviderStateMixin {
  var data;
  double opacity = 1.0;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (o) {
        setState(() {
          opacity = .5;
          msBack();
          print("Back");
        });
      },
      onTap: () {
        setState(() {
          opacity = 1.0;
          msStopBack();
          print("StopBack");
        });
      },
      child: InkResponse(
        child: new AnimatedOpacity(opacity: opacity, 
        duration: Duration(milliseconds: 500),
        child: new Container(
          margin: const EdgeInsets.only(),
          decoration: const ShapeDecoration(
            color: Colors.lightBlue,
            shape: CircleBorder(),
          ),
          child: IconButton(
            icon: //Image.asset('lib/src/assets/images/BackCircle.png',  alignment: Alignment.center,),
                Icon(
              Icons.expand_more,
              color: Colors.white,
            ),
            onPressed: null,
            iconSize: 100.0,
            enableFeedback: true,
          ),
        ),
        
        
        ),
        
        
        
         
      ),
    );
  }

  msBack() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://back-finyzlkrza-uc.a.run.app/move"),
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

  msStopBack() async {
    http.Response response = await http.get(
        Uri.encodeFull("https://back-finyzlkrza-uc.a.run.app/stop"),
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
