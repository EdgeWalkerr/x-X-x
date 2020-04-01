import "package:flutter/material.dart";

class Products extends StatelessWidget {
  final List<String> products;
  const Products(this.products);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (BuildContext context, int index) {
        return Card(
          child: Column(
            children: [
              Image.asset("assets/food.jpg"),
              Text(products[index]),
            ],
          ),
        );
      },
      itemCount: products.length,
    );
  }
}
