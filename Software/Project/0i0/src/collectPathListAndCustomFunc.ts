import typeOf from "./typeOf";
import { IAtom } from "./type";
import { IHashBidirectionalList } from "./createHashBidirectionalList";

const collectPathListAndCustomFunc = (data, newData, hashBidirectionalList: IHashBidirectionalList): {
	pathList: string[]
	customFuncList: Function[]
} => {
	const customFuncList: Function[] = [];
	const pathList = [];
	// 使用层次遍历的方式来执行
	// 加入hashBidirectionalList, 跟踪依赖情况
	// hashBidirectionalList的数据结构中value独立开特殊equalFn类型的function
	// value的数据可够可能为
	/*
		1. [func1, func2]
		2. {
			default: [func1, func2],
			customEqualFnList:[{
				func: fun1,
				equalFn: Object.is
			}]
		}
	*/
	const collectPathListAndCustomFuncHelper = (data, newData, path = "") => {
		if (!hashBidirectionalList[path]) {
			return;
		}
		// 如果value只有customFn的， 没有default的或者没有next， 则不走下面的流程
		const funcObject = hashBidirectionalList[path].value
		if ('default' in funcObject) {
			funcObject.customEqualFnList.forEach(({ customEqualFn, func }) => {
				if (!customEqualFn(data, newData)) {
					customFuncList.push(func);
				}
			})
			if (funcObject.default.length === 0 && hashBidirectionalList[path].next.length === 0) {
				return;
			}
		}
		if (data === newData) {
			return;
		}
		if (typeOf(data) === typeOf(newData)) {
			switch (typeOf(data)) {
				case "object":
					Object.keys(newData)
						.forEach((key) => {
							collectPathListAndCustomFuncHelper(data[key], newData[key], concatPath(key, path))
						})
					return;

				case "array":
					newData
						.forEach((_, index) => {
							collectPathListAndCustomFuncHelper(
								data[index],
								newData[index],
								concatPath(index, path)
							)
						})
					return;

				default:
					pathList.push(path);
					return;
			}
		}
		pathList.push(path);
	}
	collectPathListAndCustomFuncHelper(data, newData);
	return {
		pathList,
		customFuncList,
	}
};

const concatPath = (key: IAtom, path: IAtom): string => {
	if (path === "") {
		return key.toString();
	} else {
		return `${path}.${key}`;
	}
};

export default collectPathListAndCustomFunc;
