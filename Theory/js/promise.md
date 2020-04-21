# Promise

## todo

只做一个promise

```tsx
const sequence = (sequenceFunc: { func: () => void, timer: number }[]) =>
		sequenceFunc
      	.reduce(
      			(promise, { func, timer }) =>
                promise.then(() =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            func()
                            resolve()
                        }, timer)
                    })
                ),
            Promise.resolve()
    		)
```

cancel 问题: promise 无法cancel掉, 只能进行abandon

1. Promise.race, 在hooks中使用效果好 ✔︎

1. 闭包共享变量来进行abandon数据, 在每次执行下一个promise时, 可以传入一些参数作为筛选条件, 如果没有执行结束, 添加上一些这些共享变量作为后面处理的依据(不太好)

Promise即可作为constructor 又可以作为一个单纯的object, 绑定静态方法

Promise作为一个function object 是可以在实现了promise constructor 之后, 使用Promise.all = () => {} 的方式来实现静态方法

为啥使用prototype绑定catch, then, finally(性能考虑)

catch是then的语法糖:

相当于: [Promise.prototype.then(undefined, onRejected)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

Promise.prototype.finally 后返回正常的promise

等价于:

promise

.then(

  result => {

​    «statements»

​    return result;

  },

  error => {

​    «statements»

​    throw error;

  }

);

function myAsyncFunction(url) {

 return new Promise((resolve, reject) => {

  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.onload = () => resolve(xhr.responseText);

  xhr.onerror = () => reject(xhr.statusText);

  xhr.send();

 });

};