Object.create = (obj: any) => {
  function F() {}
  F.prototype = obj;
  return new F();
};

const _new = (fn: (...args: any[]) => any, ...args) => {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
};
const b = -0;
Math.sign(b); //?
b.toString();
b; //?
