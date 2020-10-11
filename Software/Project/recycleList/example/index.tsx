import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import "./styles.css";
import { cloneDeep, difference, range } from "lodash";
const viewPort = 10;

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

export default function App() {
	const [data] = useState(range(1000).map((index) => index % (viewPort + 20)));
	// keep 10 item in the viewport, when scroll, dynamic change the key
	// keep the key range from 0 - 9
	// we need to decide which is on the viewport
	const keyList = useRef(data.slice(0, viewPort + 9));
	const [segmentIndex, setSegmentIndex] = useState(0);
	const onScroll = useCallback(
		(event: React.UIEvent<HTMLDivElement>) => {
			const currentSegmentIndex = Math.floor(
				event.currentTarget.scrollTop / 120
			);
			if (currentSegmentIndex !== segmentIndex) {
				setSegmentIndex(currentSegmentIndex);
			}
			{
				/*
				1. 维持一个9大小的窗口
				2. 当滑动宽度到达6倍数的时候, 根据, 根据滑动的方向来滑动范围
			*/
			}
			// 在这里维持一个key的list， 让他永远在一定范围内
		},
		[segmentIndex]
	);
	const start = segmentIndex * 6;
	const end = Math.min(segmentIndex * 6 + viewPort + 9, data.length);
	const currentDataList = data.slice(start, end);
	const currentIdList = currentDataList;
	keyList.current = LRU(keyList.current, currentIdList);
	const idList = keyList.current.reduce(
		(result, key, index) => ({ ...result, [key]: index }),
		{} as { [key: number]: number }
	);
	// console.log(idList);
	return (
		<div
			onScroll={onScroll}
			style={{
				width: "200px",
				height: "200px",
				overflow: "scroll"
			}}
		>
			<div
				style={{
					position: "relative",
					height: data.length * 20 + "px",
					width: "200px"
				}}
			>
				{currentDataList.map((value, currentIndex) => (
					<Item
						index={segmentIndex * 6 + currentIndex}
						value={value}
						key={idList[value]}
					/>
				))}
			</div>
		</div>
	);
}

const Item = memo(({ index, value }: { index: number; value: number }) => {
	const bgColor = index % 2 === 0 ? "yellow" : "white";
	// 在进行下一波的渲染时
	// 有上一波的idList
	// 上一波的keyList
	// 这一波的idList => 这一波的keyList
	useEffect(() => {
		return () => {
			console.log("unmount");
			console.log("index", index);
		};
	}, []);
	console.log("index", index);
	return (
		<div>
			<div
				style={{
					position: "absolute",
					top: index * 20 + "px",
					height: "20px",
					width: "200px",
					backgroundColor: bgColor
				}}
			>
				{value}
			</div>
		</div>
	);
});