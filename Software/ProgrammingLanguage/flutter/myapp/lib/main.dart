// import 'package:flutter/material.dart';
// import './homePage/index.dart';

// void main() {
//   runApp(MyApp());
// }

// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       home: HomePage(),
//     );
//   }
// }
import 'package:flutter/animation.dart';
import 'package:flutter/material.dart';

void main() => runApp(LogoApp());

class LogoApp extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  Animation<double> animation;
  AnimationController controller;

  @override
  void initState() {
    super.initState();
    int value = 1;
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    // #docregion addListener
    animation = Tween<double>(begin: 0, end: 200).animate(controller)
      ..addListener(() {
        // #enddocregion addListener
        setState(() {
          value += 1;
          print(value);
          // The state that has changed here is the animation object’s value.
        });
        // #docregion addListener
      })
      ..addStatusListener((animateStatus) {
        if (animateStatus == AnimationStatus.completed) {
          print(value);
        }
      });
    // #enddocregion addListener
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.bottomLeft,
      // align Alignment.bottomLeft,
      child: Container(
        color: Colors.green,
        width: 300,
        height: 300,
        child: ClipRect(
          child: Align(
            alignment: Alignment.topCenter,
            heightFactor: 0,
            child: _FlutterLogoList(),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}

class _FlutterLogoList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Container(
          width: 20,
          height: 20,
          color: Colors.indigo,
        ),
        Container(
          width: 20,
          height: 20,
          color: Colors.yellow,
        ),
      ],
    );
  }
}
