import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class BackButtonService extends StatefulWidget {
  @override
  _BackButtonServiceState createState() => _BackButtonServiceState();
}

class _BackButtonServiceState extends State<BackButtonService> {
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
          icon: Icon(Icons.expand_more),
          color: Colors.white,
          onPressed: () async {
            await msBack();
            print("Back");
          },
          iconSize: 60.0,
        ),
      ),
      onTap: () {
        print("Stop Back");
      },
    );
  }

  Future<String> msBack() async {
    http.Response response = await http
        .get(Uri.encodeFull("https://back-finyzlkrza-uc.a.run.app/move"), headers: {"Accept": "aplication/json"});
    print(response.body);
    data = json.decode(response.body);

    return "Success!";
  }
}
