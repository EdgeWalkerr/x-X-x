/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	useMemo,
	useState,
	useRef,
	useEffect,
	useCallback,
	ReactComponentElement
} from "react";
import { ISelector, IPath, IAtom } from "./type";
import Context from "./Context";
import createHashBidirectionalList from "./createHashBidirectionalList";
import collectPathListAndCustomFunc from "./collectPathListAndCustomFunc";
import typeOf from "./typeOf";

function usePersistRef<T>(value: T) {
	const ref = useRef(null as any);
	ref.current = value;
	return ref;
}

const getPathList = (selector: string | number): string[] => {
	if (typeof selector === "string") {
		return selector.split(".");
	} else {
		return [selector.toString()];
	}
};

const createSelector = (
	valueRef: React.MutableRefObject<any>,
	hashBidirectionalList: {
		add: (path: IPath, func: Function) => void;
		remove: (path: IPath, func: Function) => void;
		collect: (pathList: (string | number)[]) => Function[];
	}
): ISelector => (selector, equalFn) => {
	const [, setAccumulator] = useState(0);
	const forceUpdate = useCallback(() => {
		setAccumulator((n) => n + 1);
	}, []);
	const selectorRef = usePersistRef(
		(() => {
			switch (typeOf(selector)) {
				case "string":
				case "number":
					return (state: any) =>
						(getPathList(selector.toString()) as string[]).reduce(
							(result, key) => result?.[key],
							state
						);
				case "object":
					return (state: any) =>
						Object.keys(selector).reduce(
							(result, key) => {
								result[key] = getPathList(selector[key]).reduce(
									(result, key) => result?.[key],
									state
								)
								return result;
							},
							{}
						);

				default:
					return (state: any) =>
						(selector as IAtom[]).map((certainSelector) =>
							getPathList(certainSelector).reduce(
								(result, key) => result?.[key],
								state
							)
						);
			}
		})()
	);
	const stateRef = useRef(selectorRef.current(valueRef.current));
	useEffect(() => {
		const path =
			typeOf(selector) === "object"
				? Object.values(selector)
				: selector as IPath;
		const func = (state) => {
			stateRef.current = selectorRef.current(state);
			forceUpdate();
		};
		hashBidirectionalList.add(path, func);
		return () => {
			hashBidirectionalList.remove(path, func);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [forceUpdate, selectorRef]);
	return stateRef.current;
};

export default function Provider({
	children,
	value
}: {
	children: ReactComponentElement<any, any> | ReactComponentElement<any, any>[];
	value: any;
}) {
	const valueRef = useRef(value);
	const hashBidirectionalList = useMemo(createHashBidirectionalList, []);
	useEffect(() => {
		if (valueRef.current !== value) {
			const { pathList, customFuncList } = collectPathListAndCustomFunc(valueRef.current, value, hashBidirectionalList.hashBidirectionalList);
			valueRef.current = value;
			const funcRef = new WeakSet();
			Array.prototype.push.apply(customFuncList, hashBidirectionalList
				.collect(pathList));
			customFuncList.forEach((func) => {
				if (!funcRef.has(func)) {
					func(valueRef.current)
					funcRef.add(func);
				}
			});
		}
	}, [value, hashBidirectionalList]);
	const useSelector = useMemo(
		() => createSelector(valueRef, hashBidirectionalList),
		[hashBidirectionalList]
	);
	return useMemo(
		() => <Context.Provider value={useSelector}>{children}</Context.Provider>,
		[children, useSelector]
	);
}
