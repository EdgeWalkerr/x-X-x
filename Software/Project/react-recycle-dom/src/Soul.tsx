import { useSelector } from "0i0";
import { memo, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IPropType {
	id: string
	expire: number
	visible: boolean
	children: ReactNode
	name: string
	props: Record<string, any>
}

const Soul = ({ id, expire, visible, children, name, props }: IPropType) => {
	const el = useRef(document.createElement('div'));
	const dispatch = useSelector((state) => state.dispatch)
	useEffect(() => {
		let timer = setTimeout(() => { }, expire * 1000);
		if (visible) {
			document
				.getElementById(id)
				?.parentElement?.insertBefore(el.current, document
					.getElementById(id)
				);
			document
				.getElementById(id)
				?.parentElement?.removeChild(document
					.getElementById(id)!)
			el.current.id = id;
			for (let key in props) {
				el.current[key] = props[key];
			}
		} else {
			timer = setTimeout(() => {
				document
					.getElementById(id)?.parentElement?.removeChild(el.current);
				dispatch({ type: 'unmount', name, id })
			}, expire * 1000);
		}
		return () => {
			clearTimeout(timer);
		}
	}, [dispatch, expire, id, name, visible])

	return createPortal(children, el.current);
};
export default memo(Soul);