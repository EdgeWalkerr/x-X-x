import React, { memo, useRef, useCallback, useState } from "react";
import { shuffle, cloneDeep, range, difference } from "lodash";

const ListItem = memo(({ v }: { v: number}) => {
  // const remove = () => {
  //   // console.log('remove', v)
  //   removeItem(v);
  // };

  console.log("render", v);

  return <li style={{ height: "30px" }}>value: {v}</li>;
});

const LRU = (keyList: number[], idList: number[]) => {
  const newKeyList = cloneDeep(keyList);
  const notIncludeKeyList = range(keyList.length).filter(
    (index) => !idList.includes(keyList[index])
  );
  const notIncludeIdList = difference(idList, keyList);
  notIncludeKeyList.forEach((key, index) => {
    newKeyList[notIncludeKeyList[index]] = notIncludeIdList[index];
  });
  return newKeyList;
};

const App = () => {
  const [list, setList] = useState(range(10, 210));

  const addItem = useCallback(() => {
    setList((list) => {
      const max = Math.max(...list);
      return [max + 1, ...list].slice(0, 200);
    });
  }, []);

  // const removeItem = useCallback((v) => {
  //   setList((x) => x.filter((value) => value !== v));
  // }, []);

  const keyList = useRef(range(list.length));

  keyList.current = LRU(keyList.current, list);

  const idList = keyList.current.reduce(
    (result, key, index) => ({ ...result, [key]: index }),
    {}
  ) as any;

  return (
    <>
      <p>
        <button onClick={addItem}>add</button>
        <button onClick={() => setList(shuffle(list))}>shuffle</button>
      </p>
      <ul>
        {list.map((v, index) => (
          // <div key={idList[v]} style={{ position: "absolute", top: index * 30 + "px" }}>
          <ListItem v={v} />
        ))}
      </ul>
    </>
  );
};

export default App;
