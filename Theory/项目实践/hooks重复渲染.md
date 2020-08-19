# function 的更改不应该引起重复渲染

## function作为props

## function 在context或者redux中

https://codesandbox.io/s/serene-heisenberg-0pos7?file=/src/App.tsx

```tsx
const useCallbackHelper = <T extends unknown>(passParams: T, fn: (params: { current: T }) => (...params: any[]) => any
) => {
  const paramsRef = useRef<T>(passParams);
  paramsRef.current = passParams;
  return useCallback(fn(paramsRef), []);
};
```

```tsx
 const addOne = useCallbackHelper({ num }, params => () => {
    const { num } = params.current;
    setNum(num + 1);
  });
```

useComponentDidMount

```tsx
const useComponentDidMount = (fn: () => any) => {  
  useEffect(fn, []);
};
```

useComponentDidUpdate

```tsx
const useComponentDidUpdate = (fn: () => any, deps: any[]) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      fn();
    }
    didMountRef.current = true;
  }, deps);
};
```

## 影响debounce、throttle的功能

https://excalidraw.com/#json=6196861064970240,hIjemKddC8skd4abvUFhPg

![image-20200803152056893](/Users/user/document/Documents/Theory/typora image/image-20200803152056893.png)

![image-20200805091207901](/Users/user/document/Documents/Theory/typora image/image-20200805091207901.png)