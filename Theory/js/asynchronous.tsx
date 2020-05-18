/*
术语:
parallel: 并行
concurrency: 同步

!callback的问题：
    * inversion control 控制反转 信任问题
        假设：调用一个异步函数，但是不清楚什么时候返回，可能会调用多次
    * 异步执行，会让控制混乱
*/

/*
    实现异步任务的顺序执行
*/
function fakeAjax(url, cb) {
    var fake_responses = {
        "file1": "The first text",
        "file2": "The middle text",
        "file3": "The last text"
    };
    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log("Requesting: " + url);

    setTimeout(function () {
        cb(fake_responses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

function getFile1(file) {
    fakeAjax(file, function (text) {
        handleResponse(file, text);
    })
}

const responses = {};
function handleResponse(filename, contents) {
    if (!(filename in responses)) {
        responses[filename] = contents;
    }
    const filenames = ["file1", "file2", "file3"]; // 保证顺序执行
    for (const file of filenames) {
        if (file in responses) {
            if (typeof responses[file] === "string") {
                output(responses[file]);
                responses[file] = false;
            }
        } else {
            return;
        }
    }
}

getFile1("file1");
getFile1("file2");
getFile1("file3");

/*
    使用thunk实现类似promise then的效果
*/


function getFile2(file) {
    let resp;
    fakeAjax(file, function (text) {
        if (!resp) {
            resp = text;
        } else {
            resp(text);
        }
    })
    return function (cb) {
        if (resp) {
            cb(resp);
        } else {
            resp = cb;
        }
    }
}

const th1 = getFile2("file1");
const th2 = getFile2("file2");
const th3 = getFile2("file3");

th1(function ready(text) {
    output(text);
    th2(function ready(text) {
        output(text);
        th3(function ready(text) {
            output(text);
        })
    })
})


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

/*
    async 使用 promise 和 generator实现
*/
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
