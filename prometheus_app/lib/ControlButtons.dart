import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:app/ControlButtons/ButtonBack.dart';
import 'package:app/ControlButtons/ButtonFront.dart';
import 'package:app/ControlButtons/ButtonRight.dart';
import 'package:app/ControlButtons/ButtonLeft.dart';


class ControlButtons extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    ValueNotifier<GraphQLClient> clientFront = ValueNotifier(
      GraphQLClient(
        cache: InMemoryCache(),
        link: HttpLink(uri: 'https://front-finyzlkrza-uc.a.run.app/move'),
      ),
    );

    ValueNotifier<GraphQLClient> clientLeft = ValueNotifier(
      GraphQLClient(
        cache: InMemoryCache(),
        link: HttpLink(uri: 'https://left-finyzlkrza-uc.a.run.app/move'),
      ),
    );

    ValueNotifier<GraphQLClient> clientRight = ValueNotifier(
      GraphQLClient(
        cache: InMemoryCache(),
        link: HttpLink(uri: 'https://right-finyzlkrza-uc.a.run.app/move'),
      ),
    );

    ValueNotifier<GraphQLClient> clientBack = ValueNotifier(
      GraphQLClient(
        cache: InMemoryCache(),
        link: HttpLink(uri: 'https://back-finyzlkrza-uc.a.run.app/move'),
      ),
    );

    // TODO: implement build
    return new Container(
      margin: const EdgeInsets.only(left: 60.0, right: 20.0, bottom: 50.0),
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          new Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              GraphQLProvider(
                client: clientFront,
                child: CacheProvider(child: ButtonFront()),
              ),
              GraphQLProvider(
                client: clientBack,
                child: CacheProvider(child: ButtonBack()),
              )
            ],
          ),
          new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              new Row(
                children: [
                  GraphQLProvider(
                    client: clientLeft,
                    child: CacheProvider(child: ButtonLeft()),
                  ),
                  GraphQLProvider(
                    client: clientRight,
                    child: CacheProvider(child: ButtonRight()),
                  )
                ],
              )
            ],
          )
        ],
      ),
    );
  }
}