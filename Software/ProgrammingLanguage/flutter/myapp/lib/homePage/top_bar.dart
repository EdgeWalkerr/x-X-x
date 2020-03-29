import 'package:flutter/material.dart';

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  Size get preferredSize => new Size.fromHeight(kToolbarHeight);
  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text('me'),
      actions: <Widget>[
        IconButton(
          icon: Icon(Icons.menu),
          onPressed: () async {
            const a = ["Adsf", "nasd"];
            final result = await showDialog(
              context: context,
              builder: (BuildContext context) {
                return AlertDialog(
                  title: Text('hello'),
                  content: Text('are you ok?'),
                  actions: <Widget>[
                    FlatButton(
                      child: Text('Yes'),
                      onPressed: () => {
                        Navigator.pop(context, {a: 'yep'})
                      },
                    ),
                    FlatButton(
                      child: Text('No'),
                      onPressed: () => {Navigator.pop(context, 'nop')},
                    )
                  ],
                );
              },
            );
            print(result is String ? result : result[a]);
            print(result.runtimeType);
          },
        )
      ],
    );
  }
}
