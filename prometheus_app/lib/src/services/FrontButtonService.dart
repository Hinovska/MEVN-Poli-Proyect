import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class FrontButtonService extends StatefulWidget {
  @override
  _FrontButtonServiceState createState() => _FrontButtonServiceState();
}

class _FrontButtonServiceState extends State<FrontButtonService> {
 var data;

  @override
  Widget build(BuildContext context) {
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
            msFront();
            print("Front");
          },
          iconSize: 60.0,
        ),
      ),
      onTap: () {
        print("Front Stop");
      },
    );
  }

  Future<String> msFront() async {
    http.Response response = await http
        .get(Uri.encodeFull("https://front-finyzlkrza-uc.a.run.app/move"), headers: {"Accept": "aplication/json"});
    print(response.body);
    data = json.decode(response.body);

    return "Success!";
  }
}
