import "package:flutter/material.dart";
import "products.dart";

class ProductManager extends StatefulWidget {
  final String startingProduct;
  const ProductManager(this.startingProduct);
  @override
  State<StatefulWidget> createState() => _ProductManagerState();
}

class _ProductManagerState extends State<ProductManager> {
  List<String> _products = [];
  @override
  void initState() {
    super.initState();
    _products = [widget.startingProduct];
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          margin: EdgeInsets.all(10.0),
          child: RaisedButton(
            onPressed: () {
              setState(() {
                _products.add("Advanced Food Tester");
              });
            },
            child: Text("Add Product"),
          ),
        ),
        Expanded(
          child: Products(_products),
        ),
      ],
    );
  }
}
