function throttle(fn: (...args: any[]) => any, wait: number) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, wait);
  };
}
