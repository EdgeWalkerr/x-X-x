# Function Programming

## side Effect -> pure function

纯函数是不含有副作用的函数，副作用意思是对外部产生影响，包括外部变量，传入的参数等

function指的是1->1的输入和输出

同样的输入对应同样的输出

## curry

渐进式定义或者执行函数

```tsx
const curry = f => x => y => f(x, y)
const uncurry = f => (x, y) => f(x)(y);
```

curry: ((...args: any[]) => any) => curryedFunction

curryedFunction: (...args: any[]) => anotherCurryedFunction | value

curry生成一个closure

```tsx
const curry = (f, ...defaultArgList) => {
  const length = f.length;
  let argList = defaultArgList;
	const func = (...args) => {
    if (args.length + argList.length >= length)  {
      return f(...argList, ...args);
    } else {
      argList = [...argList, ...args];
      return func;
    }
  }
  return argList.length >= length ? f(...argList) : func;
}
```

问题：次序的重要性, optional 和 default类型参数

map版本的curry



## Compose

f(g(x)) => compose(f, g)(x)

## Functor .chainning

```tsx
const Box = (x) =>
	({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: `Box${x}`
  })

const nextCharForNumberString_ = str => {
  const trimmed = str.trim()
  const number = parseInt(trimmed);
  const nextNumeber = Number(number + 1);
  return String.fromcharCode(nextNumber)
}

const nextCharForNumberString = str => 
	Box(str)
	.map((str) => str.trim())
	.map(parseInt)
	.map((x) => Number(x + 1))
	.fold(String.fromCharCode)
```

## Monad

http://www.ruanyifeng.com/blog/2015/07/monad.html

monad 是一种将计算过程表示成连续的步骤的结构

1 -> 2 -> 3...

比较常见的方式是compose或者chaining

compose的问题是没有封装性， 不能处理一些特定的问题，比如差错等

使用chaining在最上层封装了一层数据结构，可以保持步骤的感觉，也可以处理特定的问题

### Either Monad

```tsx
// Definitions
// ====================
const Right = x =>
({
 chain: f => f(x),
 map: f => Right(f(x)),
 fold: (f, g) => g(x),
 toString: () => `Right(${x})`
})

const Left = x =>
({
 chain: f => Left(x),
 map: f => Left(x),
 fold: (f, g) => f(x),
 toString: () => `Left(${x})`
})

const fromNullable = x =>
 x != null ? Right(x) : Left(null)

const tryCatch = f => {
 try {
   return Right(f())
 } catch(e) {
   return Left(e)
 }
}

const logIt = x => {
 console.log(x)
 return x
}

const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================


// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const street_ = user => {
 const address = user.address

 if(address) {
   return address.street
 } else {
   return 'no street'  
 }
}

const street = user =>
  fromNullable(user.address)
  .chain((address) => fromNullable(address.street))
  .fold(() => 'no street', (x) => x)


QUnit.test("Ex1: street", assert => {
 const user = { address: { street: { name: "Willow" } } }
 assert.deepEqual(street(user), {name: "Willow"})
 assert.equal(street({}), "no street")
})

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const streetName_ = user => {
 const address = user.address

 if(address) {
   const street = address.street

   if(street) {
     return street.name
   }
 }

 return 'no street'
}

const streetName = user =>
  fromNullable(user.address)
  .chain((address) => fromNullable(address.street))
  .fold(() => 'no street', (x) => x.name)

QUnit.test("Ex1: streetName", assert => {
 const user = { address: { street: { name: "Willow" } } }
 assert.equal(streetName(user), "Willow")
 assert.equal(streetName({}), "no street")
 assert.equal(streetName({ address: { street: null } }), "no street")
})


// Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
const parseDbUrl_ = cfg => {
 try {
   const c = JSON.parse(cfg) // throws if it can't parse
   return c.url.match(DB_REGEX)
 } catch(e) {
    return null
 }
}

const parseDbUrl = cfg =>
  tryCatch(() => JSON.parse(cfg))
  .chain((c) => tryCatch(() =>  c.url.match(DB_REGEX)))// throws if it can't parse
  .fold(() => null, (x) => x)

QUnit.test("Ex1: parseDbUrl", assert => {
 const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}' 
 assert.equal(parseDbUrl(config)[1], "sally")
 assert.equal(parseDbUrl(), null)
})



// Ex3: Using Either and the functions above, refactor startApp
// =========================
const startApp_ = cfg => {
 const parsed = parseDbUrl(cfg)

 if(parsed) {
   const [_, user, password, db] = parsed
   return `starting ${db}, ${user}, ${password}`
 } else {
   return "can't get config"
 }
}
const startApp = cfg =>
  fromNullable(parseDbUrl(cfg))
  .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
  .fold(() => "can't get config", x => x)

const startApp1 = cfg => {
 const parsed = parseDbUrl(cfg)

 if(parsed) {
   const [_, user, password, db] = parsed
   return `starting ${db}, ${user}, ${password}`
 } else {
   return "can't get config"
 }
}


QUnit.test("Ex3: startApp", assert => {
 const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
 assert.equal(String(startApp(config)), "starting mydb, sally, muppets")
 assert.equal(String(startApp()), "can't get config")
})
```

### Task monad: lazy promise

lazy的意思和作用

意思是使用时执行和function含义相同

Compose 多个function

```tsx
const Box = f => ({
  map: (g) => Box(compose(f, g)),
  fold: f,
})
```

### Traverse

```tsx
[Task.of(value1), Task.of(value2), Task.of(value3)] -> Task([value1,value2, value3])
```

和Promise.all很相似

promise.all([promise1, promise2, promise3]) => promise([value1, value2, value3])

### Natural transformation

nt(a.map(f)) == nt(a).map(f))

F a => T a

```tsx
const { Right, Left } = require('../either')
const Box = require('../box')
const Task = require('data.task')

// nt(a.map(f)) == nt(a).map(f)
const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

const fake = id =>
  ({id: id, name: 'user1', best_friend_id: id + 1})

const Db = ({
  find: id =>
    new Task((rej, res) =>
      setTimeout(() =>
        res(id > 2 ? Right(fake(id)) : Left('not found')),
        100))
})

const send = (code, json) =>
  console.log(`sending ${code}: ${JSON.stringify(json)}`)
/*
transform to simpler version
*/
Db.find(1)
.chain(eu =>
  eu.fold(e => Task.of(eu),
          u => Db.find(u.best_friend_id)))
.fork(error => send(500, {error}),
      eu => eu.fold(error => send(404, {error}),
                    x => send(200, x)))

/*
transform start
*/

Db.find(1)
.chain(eitherToTask)
.chain(u => Db.find(u.best_friend_id))
.chain(eitherToTask)
.fork(error => send(500, {error}),
      eu => send(200, x))

Promise拥有这种差错处理方案 但是只是用于处理error， 不用于处理一般的either情况

/*
transform end
*/

```

