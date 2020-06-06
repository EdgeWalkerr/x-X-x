const debounce = (func, wait = 100, leading = false) => {
    let tailTimerId = null;
    let leadingTimerId = null;
    return () => {
        if (leading) {
            if (leadingTimerId !== null) {
                clearTimeout(leadingTimerId);
                leadingTimerId = null;
            } else {
                func();
                leadingTimerId = setTimeout(() => {
                    leadingTimerId = null;
                }, wait);
            }
        } else {
            if (tailTimerId !== null) {
                clearTimeout(tailTimerId);
                tailTimerId = null;
            } else {
                tailTimerId = setTimeout(() => {
                    func();
                    tailTimerId = null;
                }, wait);
            }
        }

    }
}

const debounceConsole = debounce(() => {
    console.log("yes");
}, 100, true); //?
let num = 10;
setInterval(() => {
    if (num > 0) {
        debounceConsole();
        num -= 1;
    }
}, 110); //?
