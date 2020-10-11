import React, { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [num, setNum] = useState(0)
  const addOne = useCallback(() => {
    setNum(num => num + 1);
  }, [])
  debugger;
  const func = useCallback(() => {
    console.log(num);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App">
      <button onClick={addOne}>add one</button>
      <p>num: {num}</p>
    </div>
  );
}

export default App;
