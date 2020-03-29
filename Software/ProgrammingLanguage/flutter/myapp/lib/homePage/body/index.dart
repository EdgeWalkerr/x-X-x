import 'package:flutter/material.dart';
import './status.dart';
import './activity.dart';
import './summary.dart';

class Body extends StatelessWidget {
  static List<Widget> _widgetOptions = <Widget>[
    Status(),
    Activity(),
    Summary(),
  ];
  final int index;
  Body({Key key, @required this.index}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return _widgetOptions[index];
  }
}
