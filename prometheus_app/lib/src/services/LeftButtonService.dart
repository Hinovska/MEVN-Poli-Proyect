import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LeftButtonService extends StatefulWidget {
  @override
  _LeftButtonServiceState createState() => _LeftButtonServiceState();
}

class _LeftButtonServiceState extends State<LeftButtonService> {
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
          icon: Icon(Icons.chevron_left),
          color: Colors.white,
          onPressed: () {
            msLeft();
            print("Left");
          },
          iconSize: 60.0,
        ),
      ),
      onTap: () {
        print("Left Stop");
      },
    );
  }

  Future<String> msLeft() async {
    http.Response response = await http
        .get(Uri.encodeFull("https://left-finyzlkrza-uc.a.run.app/move"), headers: {"Accept": "aplication/json"});
    print(response.body);
    data = json.decode(response.body);

    return "Success!";
  }
}
