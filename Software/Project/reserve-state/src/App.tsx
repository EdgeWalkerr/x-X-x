import React, { useState, useRef, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

type IDataAndRecovery = {
  data: any,
  recovery: (data: any) => void
}[]

function useStateCollect(propsStateAndRecovery: IDataAndRecovery) {
  const flag = useRef(false)
  const dataAndRecovery = useRef<IDataAndRecovery>(null)
  useEffect(() => {
    if (flag.current) {
      dataAndRecovery.current!.forEach(({ data, recovery }) => {
        recovery(data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  flag.current = false;
  const recap = useCallback(() => {
    flag.current = true
  }, [])
  const setStamp = useCallback(() => {
    (dataAndRecovery as any).current = propsStateAndRecovery
  }, [propsStateAndRecovery]);
  return {
    recap,
    setStamp,
  }
}

function App() {
  const [arr, setArr] = useState<{ a: number }[]>([{ a: 0 }])
  const [test, setTest] = useState(0)
  useEffect(() => {
    setStamp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    try {
      const a = arr[10].a
    } catch {
      recap()
      alert('be careful! error!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr])
  useEffect(() => {
    try {
      if (arr.length > 0) {
        setTest((test) => test + 1)
      }
    } catch {
      recap()
      alert('be careful! error!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr.length])
  const click = useCallback(() => {
    setStamp()
    try {
      setArr((arr) => [...arr, { a: arr.length }])
    } catch {
      recap()
      alert('be careful! error!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // useEffect在最后的时刻
  const { recap, setStamp } = useStateCollect([{ data: arr, recovery: setArr }, { data: test, recovery: setTest }])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={click}>click me</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
