import React, { useRef, useEffect, ReactNode } from 'react';
import { range } from 'lodash';
import styled from '@emotion/styled';

interface IPropType {
  num: number;
  callback: (time: number) => void;
}

export default function Emotion10({ num, callback }: IPropType) {
  const timeRef = useRef(new Date().valueOf());
  useEffect(() => {
    setTimeout(() => {
      callback(new Date().valueOf() - timeRef.current);
    });
  }, []);
  const Div = styled.div`
    color: red;
    width: 1;
    height: 1;
  `;
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
        <Div key={index} />
      ))}
    </div>
  );
}
