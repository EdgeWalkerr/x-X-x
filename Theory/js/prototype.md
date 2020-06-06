# 继承和原型链

如何判断是否可以作为构造函数:

* Functions created via the arrow functions syntax or via a method definition in classes or object literals are *not constructable*.

* Functions created via the `class` syntax are *not callable*.

* Functions created in any other way (function expression/declaration, `Function` constructor) are callable and constructable.

* Built-in functions are not constructrable unless explicitly stated otherwise.

new 的过程:

1. 一个继承自 `*Foo*.prototype` 的新对象被创建。
2. 使用指定的参数调用构造函数 *`Foo`*，并将 `this` 绑定到新创建的对象。`new *Foo*` 等同于 *`new Foo`*`()`，也就是没有指定参数列表，*`Foo`* 不带任何参数调用的情况。
3. 由构造函数返回的对象就是 `new` 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

考虑性能:

在prototype上分享代码: 浏览器性能优化问题

用this.method方法创建成员分享代码: 每次new多创建成员



## class

1. Class 中的arrow function 属于 member, 在constructor中执行

```tsx
class A {
  b = () => {}
}
```

相当于

```tsx
class A {
  constructor () {
    this.b = () => {}
  }
}
```

2. super和this在class中的表现:

this 指向

1. super.speak() 
   相当于：
   Cat.prototype.speak.call(this)
2. super(name) 
   相当于：
   Cat.prototype.constructor.call(this, name)
   或者
   Cat.call(this, name)

Class 中的继承是双线继承:


```tsx
class A {}
class B extends A {}
B.prototype.__proto__ = A.prototype // 为了继承非static方法
B.__proto__ = A // 为了继承static方法
```

Class 没有完全实现function 的继承能力

func.prototype.a = ‘adfafs’ // 这个功能class无法实现

### mix-ins

Object.assign(User.prototype, sayHiMixin);

Object.assign 和 Object spread的关系:

效果: Object.assign是对象扩展, 在原对象的基础上增加属性

Object spread则是返回一个新对象

Object.create和setPrototype的区别:

Object.create的第二个参数**propertiesObject, 其他没有差别**

浏览器如何实现属性遮蔽

和并查集的关系

function 继承

1. 所有的function都有function.prototype.constructor = function

2. 所有的function继承自Function
    包括普通声明的function, arrow function, Object, Function

3. 所有的function 的 prototype继承自Object.prototype
4. 通过new 可以实现继承;const foo = new Foo();
5. Object.prototype继承自Null
    因此
    function Foo () {

}

最原始的js提供了两种继承方法来分别实现1层继承和2层继承

const foo = {



};

字面量定义一个object, 仅仅继承自Object

但是这个没有达到继承需要的代码复用功能，因此js提供了new的方式， 使得可以多继承一层，

用const foo = new Foo();

const foo = new Foo();
Foo = {
  prototype: {
    constructor: Foo,
    \_\_proto\_\_: Object.prototype,
  },
  \_\_proto\_\_: { // Function.prototype,
    //其余Function.prototype属性
    \_\_proto\_\_: Object.prototype,
  } 
}

foo = {继承自Foo, Object
  // 其余foo的属性
  \_\_proto\_\_: Foo.prototype,
}



a isInstanceof b 为true

表示b的prototype 在 a的原型链上