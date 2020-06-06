# 垃圾回收

## reference-counting garbage collection

This algorithm reduces the problem from determining whether or not an object is still needed to determining if an object still has any other objects referencing it.

会有循环引用的问题：

```js
var div;
window.onload = function() {
  div = document.getElementById('myDivElement');
  div.circularReference = div;
  div.lotsOfData = new Array(10000).join('*');
};
```



Mark-and-sweep algorithm

This algorithm assumes the knowledge of a set of objects called *roots.* In JavaScript, the root is the global object. Periodically, the garbage collector will start from these roots, find all objects that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the garbage collector will thus find all *reachable* objects and collect all non-reachable objects.

