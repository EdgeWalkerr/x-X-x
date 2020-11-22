import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { shuffle } from 'lodash'

function App() {
  const [state, setState] = useState([1, 2, 3]);
  useEffect(() => {
    console.log(state);
    // const list = document.getElementById('list');
    // (list?.children as any)[0] = 1;
    // const dupNode list?.children.item(0)
    // var p = document.createElement("p");
    // list?.appendChild(p);
  }, [state]);
  const shuffleList = useCallback(() => {
    setState(shuffle);
  }, [])
  return (
    <div className="App">
      <div id="list">
        <div key={state[0]}>1</div>
        <div key={state[1]}>2</div>
        <div key={state[2]}>3</div>
      </div>
      <button onClick={shuffleList}>shuffle</button>
    </div>
  );
}

export default App;
