import React from 'react';
import SwiperWithAnimateAtEndPoint from "./swiperWithAnimateAtEndPoint";
import './App.css';

const App: React.FC = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <SwiperWithAnimateAtEndPoint>
        <div style={{ width: window.innerWidth - 100, height: 200, backgroundColor: "red" }} />
        <div style={{ width: window.innerWidth - 100, height: 200, backgroundColor: "yellow" }} />
        <div style={{ width: window.innerWidth - 100, height: 200, backgroundColor: "pink" }} />
        <div style={{ width: window.innerWidth - 100, height: 200, backgroundColor: "blue" }} />
      </SwiperWithAnimateAtEndPoint>
      <div style={{ width: "100px", height: window.innerHeight, backgroundColor: "green" }} />
    </div>
  );
}

export default App;
