import { produce } from 'immer'

// const b = { a: { c: 'ddd'} }
// const a = produce(b, (draft) => {
//     draft.a.c = 'eee'
//     draft.a.c = 'ddd'
//     return draft
// })


// Object.hasOwnProperty = 'a'

// Object.hasOwnProperty.bind(Object) // ?
function func() {
    this.asdf = 'afd';
    return 'adfaf'
}

const ddd = new func()
const fpp = {}
fpp.__proto__ = Function.prototype
fpp.prototype = {}
fpp.prototype.constructor = func
class Dog {
    constructor(name) {
        this.name = name;
    }
}
const dddd = new Dog() // ?
dddd.prototype // ?
func.__proto__ === Function.prototype // ?

ddd.__proto__ === func.prototype // ?

ddd.__proto__.constructor.prototype.constructor(); // ?

Object.getOwnPropertyDescriptor(func, '__proto__') // ?

const isDelete = delete func.prototype.constructor // ?
delete func.prototype.__proto__.constructor // ?


// func.prototype = {} // ?
// func.prototype.__proto__.__proto__ // ?
// func.prototype.constructor // ?
// const a = new func // ?
// a() // ?
// a.__proto__.__proto__ === Function.prototype // ?
// a.prototype // ?
function f1() {
    return this;
}

// In a browser:
f1() === window; // ?

// In Node:
f1() === global; // ?

class Rectangle {
    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        return {};
    }
}

const c = new Rectangle(0, 0); // ?
c.height // ?

var Animal = {
    speak() {
        console.log(this.name + ' makes a noise.');
    }
};



Object.setPrototypeOf(Dog.prototype, Animal);// 如果不这样会做，在调用speak时会返回TypeError

var d = new Dog('Mitzie');
d.speak(); // ?

class obj1 {
    method1() {
        console.log(this.a);
    }
}

class obj2 extends obj1 {
    a = 'asdfasdf'
    method2 = () => {
        this.a = 'asdf'
        super.method1();
    }
    method3 = () => {
        console.log(this.a);
    }
}

//   Object.setPrototypeOf(obj2, obj1);
const obj2Instance = new obj2()
obj2Instance.method2(); // ?
obj2Instance.method3(); // ?

var a = { a: 1 };
// a ---> Object.prototype ---> null

var b = Object.create(a);
b.a // ?
b.__proto__ === a // ?

const func1 = () => {
    // function F() { }
    this.a = 'asdf'
    // return (new F());
}
const b = new func1() // ?
