
import 'package:flutter/material.dart';


//my import
import 'components/HomeComponent.dart';



class App extends StatelessWidget {
  @override
  Widget build(context) {

    return MaterialApp(
      debugShowCheckedModeBanner: false,
        title: 'Prometheus',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: new HomeComponent());
  }
}