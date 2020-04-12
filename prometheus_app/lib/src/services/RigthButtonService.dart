import 'dart:async';
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
    return InkWell(
      child: new Container(
        margin: const EdgeInsets.only(top: 20.0),
        decoration: const ShapeDecoration(
          color: Colors.lightBlue,
          shape: CircleBorder(),
        ),
        child: IconButton(
          icon: Icon(Icons.chevron_right),
          color: Colors.white,
          onPressed: () {
            msRigth();
            print("Rigth");
          },
          iconSize: 60.0,
        ),
      ),
      onTap: () {
        print("Rigth Stop");
      },
    );
  }

  Future<String> msRigth() async {
    http.Response response = await http
        .get(Uri.encodeFull("https://right-finyzlkrza-uc.a.run.app/move"), headers: {"Accept": "aplication/json"});
    print(response.body);
    data = json.decode(response.body);

    return "Success!";
  }
}
