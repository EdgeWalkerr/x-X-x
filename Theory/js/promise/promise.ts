enum state {
  FULFILLED,
  REJECTED,
  PENDING,
}
interface thisInterface {
  state;
  callbacks: any[];
  result: any;
}

const transition = (promise, state, result) => {
  if (promise.state !== state.PENDING) return;
  promise.state = state;
  promise.result = result;
};

const Promise1 = function (
  this: thisInterface,
  fn: (
    resolve: (...args: any[]) => void,
    reject: (...args: any[]) => void
  ) => void
) {
  this.state = state.PENDING;
  this.callbacks = [];
  this.result = null; // fulfilled 是 值 rejected 是reason
  const onFulfilled = (value) => transition(this, state.FULFILLED, value);
  const onRejected = (reason) => transition(this, state.REJECTED, reason);
  let ignore = false;
  let resolve = (value) => {
    if (ignore) return;
    ignore = true;
    resolvePromise(this, value, onFulfilled, onRejected);
  };

  let reject = (reason) => {
    if (ignore) return;
    ignore = true;
    onRejected(reason);
  };
  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
};

const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    let reason = new TypeError('Can not fulfill promise with itself');
    return reject(reason);
  }

  if (result instanceof Promise) {
    return result.then(resolve, reject);
  }

  resolve(result);
};

Promise1.prototype.then = function (
  this: thisInterface,
  onFulfilled,
  onRejected
) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject };
    if (this.state === state.PENDING) {
      this.callbacks.push(callback);
    } else {
      setTimeout(() => handleCallback(callback, this.state, this.result), 0);
    }
  });
};

const handleCallback = (callback, thisState, result) => {
  let { onFulfilled, onRejected, resolve, reject } = callback;
  try {
    if (thisState === state.FULFILLED) {
      resolve(onFulfilled(result));
    } else if (thisState === state.REJECTED) {
      resolve(onRejected(onRejected(result)));
    }
  } catch (error) {
    reject(error);
  }
};
