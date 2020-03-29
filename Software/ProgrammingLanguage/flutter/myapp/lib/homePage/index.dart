import 'package:flutter/material.dart';
import './body/index.dart';
import './top_bar.dart';
import './bottom_tab.dart';

class HomePage extends StatefulWidget {
  _HomePage createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  int index = 0;
  void onChangeIndex(int index) {
    this.setState(() {
      this.index = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopBar(),
      body: Body(index: index),
      bottomNavigationBar: BottomTab(onChangeIndex: onChangeIndex),
    );
  }
}
