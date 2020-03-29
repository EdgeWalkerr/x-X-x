import React, { ReactNode, useState, useCallback, useEffect } from 'react';
import uuid from "uuid/v4";

interface IPropType {
  children: ReactNode[];
  onScroll?: (x: number) => void;
}
var letterCombinations = function (digits: string) {
  const digits2stringList = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  const getCombinationList = (digits, combinationList) => digits.length === 0 ? combinationList : getCombinationList(digits.slice(1), digits2stringList[+digits[0] - 2].split("").reduce((tempResult, letter) => [...tempResult, ...combinationList.length === 0 ? [letter] : combinationList.map((value) => value + letter)], []));
  return getCombinationList(digits, []);
};

letterCombinations("23"); /*?*/



export default function SwiperWithAnimateAtEndPoint({ children }: IPropType) {
  const [id] = useState(uuid());
  const [translateX, setTranslateX] = useState(0);
  const [isMove, setIsMove] = useState(false);
  const onScroll = useCallback(() => {
    // 如果滑动到左边区域或者右边区域则触发弹性
    const scrollLeft = document.getElementById(id)!.scrollLeft;
    if (isMove && scrollLeft < window.innerWidth) {
      setTranslateX(window.innerWidth - scrollLeft);
    }
  }, [id, isMove]);
  useEffect(() => {
    document.getElementById(id)!.scrollTo({
      left: window.innerWidth,
      behavior: "auto",
    })
  }, [id]);
  return (
    <div
      id={id}
      style={{
        overflowX: "auto",
        scrollSnapType: "x mandatory",
      }}
      onTouchStart={() => {
        setIsMove(true);
      }}
      onTouchEnd={() => {
        setTranslateX(0);
        setIsMove(false);
      }}
      onScroll={onScroll}
    >
      <div

        style={{
          display: "flex", width: 4 * (window.innerWidth - 100) + 2 * window.innerWidth,
          transition: "all 0s ease",
          transform: `translateX(-${translateX}px)`
        }}
      >
        <div style={{ width: window.innerWidth, backgroundColor: "grey" }} />
        {children.map((certainChildren) => <div style={{ scrollSnapAlign: "center" }}>
          {
            certainChildren
          }
        </div>)}
        <div style={{ width: window.innerWidth, backgroundColor: "grey" }} />
      </div>
    </div>
  );
} 
