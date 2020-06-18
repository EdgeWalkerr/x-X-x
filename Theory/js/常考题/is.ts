Object.is = (x: any, y: any) => {
  // 判断是否为-0 和 isNaN
  if (typeof x === 'number' && isNaN(x) && typeof y === 'number' && isNaN(y)) {
    return true;
  }

  const isNegativeZero = (x) => x === 0 && 1 / x === -Infinity;
  if (isNegativeZero(x) || isNegativeZero(y)) {
    return isNegativeZero(x) && isNegativeZero(y);
  }
  return x === y;
};

console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
