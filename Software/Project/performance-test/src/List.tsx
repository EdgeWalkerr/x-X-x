import React, { useCallback, memo, useState } from 'react'
import { range, shuffle } from 'lodash'

export default function List() {
	const [numberList, setNumberList] = useState(range(30))
	const shuffleList = useCallback(() => {
		setNumberList(shuffle);
	}, [])
	return (
		<div>
			<button onClick={shuffleList}>shuffle</button>
			<ListUseIdAsKey numberList={numberList}/>
			{/* <ListUseIndexAsKey numberList={numberList}/> */}
		</div>
	)
}

interface IPropType {
	numberList: number[]
}

const ListUseIdAsKey = ({ numberList}: IPropType) => {
	return (
		<>
			{ numberList.map((number) => <Item key={number} num={number}/>)}
		</>
	)
}

const Item = memo(({ num }: { num: number }) => (
	<div>
		<div>{num}</div>
	</div>
))

const ListUseIndexAsKey = ({ numberList }: IPropType) => {
	return (
		<>
			{ numberList.map((number, index) => <Item key={index} num={number}/>)}
		</>
	)
}