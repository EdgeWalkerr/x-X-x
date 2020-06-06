import nav from "./nav";
import {
    top,
    bottom
} from './footer';

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('lalal');
        resolve('two');
    }, 400);
});

const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('lalal');
            resolve('three')
        }, 500);
    })
    .then(() => {
        return new Promise(() => {
            setTimeout(() => {
                console.log('asdfasdf');
            })
        })
    });

Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
});

function* main() {
    yield 1;
    // return 2;
    yield 3;
}

var it = main(); //?
it.next(); // ?

it.next(); // ?
it.next(); // ?
function coroutine(g) {
    var it = g();
    return function () {
        return it.next.apply(it, arguments);
    }
}
const run = coroutine(function* () {
    let x = 1 + (yield Promise.resolve(3).then(run)); // ?
    let y = 1 + (yield Promise.resolve(3).then(run)); // ?
    yield Promise.resolve(x + y).then(run); //?
});

run(); //?

// yield a promise and resume with next