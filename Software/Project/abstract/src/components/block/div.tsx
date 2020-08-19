import React, { useRef, useEffect, ReactNode } from 'react';
import { range } from 'lodash-es';

interface IPropType {
  num: number;
  callback: (time: number) => void;
}

export default function Div({ num, callback }: IPropType) {
  const timeRef = useRef(new Date().valueOf());
  useEffect(() => {
    setTimeout(() => {
      callback(new Date().valueOf() - timeRef.current);
    });
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {range(num).map((_, index) => (
        <div key={index} style={{ color: 'red', width: 1, height: 1 }} />
      ))}
    </div>
  );
}
