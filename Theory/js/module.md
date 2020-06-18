# ESM CommonJS AMD UMD

## IIFE

```tsx
const workshop = (function Module() {
  var teacher = "kyle";
  return {
    ask (question) {
      console.log(teacher, question);
    }
  }
})();
```

## CommonJS

资料：

http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html

http://www.ruanyifeng.com/blog/2015/05/require.html

https://www.jianshu.com/p/ba0faf79c167

加载时执行

遇到循环加载时：**一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出**

a.js

```javascript
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

b.js

```javascript
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

main.js

```javascript
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行main.js, 结果如下

```bash
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

## ESM

资料： https://www.jianshu.com/p/ba0faf79c167https://www.jianshu.com/p/ba0faf79c167

构建（静态解析）-> 实例化（活绑定 live binding）-> 运行

## AMD

1. 根据加载器规则寻找模块，并通过插入script标签异步加载；
2. 在模块代码中通过词法分析找出依赖模块并加载，递归此过程直到依赖树末端；
3. 绑定 `load` 事件，当依赖模块都加载完成时执行回调函数；

```html
<!-- index.html  -->
<html>
  <body>
    <script data-main="./app.js" src="./require.js"></script>
  </body>
</html>
```

data-main属性值表示在加载完./require.js之后执行 ./app.js代码

```js
// app.js
define(['./a', './b'], function(a, b) {
  console.log('app starting');
  console.log('in app', a, b);
});
```

```js
// a.js
define(['./b', 'exports'], function(b, exports) {
  console.log('a starting');
  exports.done = false;
  console.log('in a, b.done =', b.done);
  console.log('a done');
  exports.done = true;
});
```

```js
// b.js
define(['./a', 'exports'], function(a, exports) {
  console.log('b starting');
  exports.done = false;
  console.log('in b, a.done =', a.done);
  console.log('b done');
  exports.done = true;
});
```

## UMD

用来可以运行在前端和后端（node）

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```

