/*
	==:
	如果两边类型相同用 ===
	如果两边是undefined或者是null: equal
	如果类型不同：
	查看两边是否有非原始类型，首先转换为string
	转换为string之后还不能够相等，转换为number
*/
console.log(42 == [42]);
console.log([] == ![]);

var a = {
  i: 0,
  valueOf() {
    this.i += 1;
    return this.i;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}

const tryIt = () => {
  try {
    throw new Error();
    return 'Adf';
  } catch {
    return 'Asdf';
  }
};
tryIt(); // ?

// !!stack traces

var test = {
  i: 10,
  toString: function () {
    console.log('toString');
    return this.i;
  },
  valueOf: function () {
    console.log('valueOf');
    return this.i;
  },
};
console.log(test);
// console.log(+test);
// console.log(''+test); //?
// console.log(String(test)); // 10 toString
// console.log(Number(test)); // 10 valueOf
// console.log(test == '10'); // true valueOf
// console.log(test === '10'); // false
