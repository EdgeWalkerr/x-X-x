import * as React from "react";
import { Item } from "./item";

export const Context = React.createContext(0);

export default function App() {
  const [num, setNum] = React.useState(0);
  return (
    <Context.Provider value={num}>
      <Item />
      <button onClick={() => setNum((num) => num + 1)}> add One </button>
    </Context.Provider>
  );
}
