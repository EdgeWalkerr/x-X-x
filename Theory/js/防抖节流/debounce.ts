function debounce(
  func: (...args: any[]) => any,
  wait: number,
  immediate = false
) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (!timeout) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
