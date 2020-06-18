type aliases give a type a name

可以使用 = 来进行赋值

type a = string | number

!! 不可以自我引用

原因： 首先求值， 再进行复制

type a  = string | b

type b = a | number

interface 可以表示一切的的object

用来连接， 只有在使用的时候才进行求值

function

重载

```tsx
function contactPeople(method: 'email', ...people: HasEmail[]): void;
function contactPeople(method: 'phone', ...people: HasPhoneNumber[]): void;

// "function implementation"
function contactPeople(
  method: 'email' | 'phone',
  ...people: (HasEmail | HasPhoneNumber)[]
): void {
  if (method === 'email') {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
  }
}
```



```tsx
interface IFunc {
  (...args: any[]): void
}
```

constructor

```tsx
interface IContstructor {
  new (...args: any[]): void
}
```

Array

```tsx
interface IArray {
	[index: number]: string
}
```

### Class

access modifier keywords

public - everyone

protected - me and subsclasses

private - only me

```tsx
class A {
  constructor(
  	public a: string,
     protected b: string, // 出错， 外部不能够直接赋值
     private c: string // 出错，外部不能够直接赋值
  )
}
```

Abstract class

部分定义类型 部分实现



## type guard

build in 

typeof instanceOf

自定义

is

```tsx
const isOfType = function <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T {
  return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
}
```

## generic type

使用T来表示

## advanceType

keyof

typeof

Conditional types

```tsx
 type EventualType<T> = T extends Promise<infer S> // if T extends Promise<any>
   ? S // extract the type the promise resolves to
   : T; // otherwise just let T pass through
```

### top bottomType

top type

any unknown

unknown 表示等待未来缩小范围

Any 是包含任意的值

never表示任意值都不行





