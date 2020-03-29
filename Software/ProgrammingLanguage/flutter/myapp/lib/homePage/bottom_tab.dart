import 'package:flutter/material.dart';

class BottomTab extends StatefulWidget {
  final void Function(int) onChangeIndex;
  BottomTab({Key key, @required this.onChangeIndex}) : super(key: key);
  _BottomTab createState() => _BottomTab(onChangeIndex: this.onChangeIndex);
}

class _BottomTab extends State<BottomTab> {
  int currentIndex = 0;
  void Function(int) onChangeIndex;
  _BottomTab({@required this.onChangeIndex});
  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: (index) {
        this.onChangeIndex(index);
        this.setState(() {
          currentIndex = index;
        });
      },
      selectedItemColor: Colors.red,
      unselectedItemColor: Colors.lightBlue,
      items: [
        BottomNavigationBarItem(
          icon: Icon(
            Icons.person,
            color: Colors.lightBlue,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          activeIcon: Icon(
            Icons.person,
            color: Colors.red,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          title: Text('状态'),
        ),
        BottomNavigationBarItem(
          icon: Icon(
            Icons.people,
            color: Colors.lightBlue,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          activeIcon: Icon(
            Icons.people,
            color: Colors.red,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          title: Text('活动'),
        ),
        BottomNavigationBarItem(
          icon: Icon(
            Icons.visibility,
            color: Colors.lightBlue,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          activeIcon: Icon(
            Icons.visibility,
            color: Colors.red,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          title: Text('数据'),
        ),
      ],
    );
  }
}
