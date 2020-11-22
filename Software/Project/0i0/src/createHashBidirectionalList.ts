import { IPath, IAtom, IEqual } from "./type";

interface INode {
	value: Function[] | {
		default: Function[],
		customEqualFnList: {
			customEqualFn: IEqual,
			func: Function
		}[]
	}
	next: INode[];
	prev?: INode;
	key: IAtom;
}
const createNode = ({ func, key, equalFn }: { func?: Function, key: IAtom, equalFn?: IEqual }): INode => {
	const emptyObject = Object.create(null);
	if (func) {
		if (equalFn) {
			emptyObject.value = {
				default: [],
				customEqualFnList: [{
					customEqualFn: equalFn,
					func,
				}]
			}
		} else {
			emptyObject.value = [func];
		}
	} else {
		emptyObject.value = [];
	}
	emptyObject.next = [];
	emptyObject.key = key;
	return emptyObject;
};

const split = (path: IAtom) => {
	if (typeof path === "number") {
		return {
			[path]: ""
		};
	} else {
		const splitPath = path.split(".");
		return splitPath.reduce(
			(result, _, index) => ({
				...result,
				[(index === 0 ? splitPath : splitPath.slice(0, -index)).join(".")]: ""
			}),
			{}
		);
	}
};

export type IHashBidirectionalList = Record<IAtom, INode>;

const createHashBidirectionalList = () => {
	const hashBidirectionalList: IHashBidirectionalList = {}
	const recursiveFindNode = (path: IAtom): INode => {
		const splitPath = path.toString().split(".");
		while (path !== '') {
			if (hashBidirectionalList[path]) {
				return hashBidirectionalList[path];
			} else {
				splitPath.pop();
				path = splitPath.join(".");
			}
		}
		return hashBidirectionalList[''];
	};

	const insertNode = (path: IAtom, func: Function, equalFn?: IEqual): void => {
		// 准确找到node, 如果没有则插入
		// 1. find the point to insert
		// 2. if the insert point has children, then need to check out if need to insert in one of these node
		// 如果没有header， 需要首先创建header， 然后执行后面的部分
		if (Object.keys(hashBidirectionalList).length === 0) {
			const head = createNode({ key: "" });
			hashBidirectionalList[''] = head;
			return;
		}
		const node = hashBidirectionalList[path];
		// 如果有equalFn 然后是list的情况
		// 如果有equalFn 有default的情况
		// 如果没有equalFn, 是list的情况
		// 如果没有equalFn, 有default的情况
		if (node) {
			switch (true) {
				case equalFn && !('default' in node.value):
					node.value = {
						default: node.value,
						customEqualFnList: [{
							customEqualFn: equalFn,
							func,
						}]
					} as any;
					break;

				case equalFn && 'default' in node.value:
					(node.value as any).customEqualFnList.push({
						customEqualFn: equalFn,
						func,
					});
					break;

				case !equalFn && !('default' in node.value):
					(node.value as Function[]).push(func)
					break;

				default:
					(node.value as any).default.push(func)
					break;

			}
		} else {
			const newNode = createNode({ func, key: path, equalFn });
			hashBidirectionalList[path] = newNode;
			const node = recursiveFindNode(path);
			const index = node.next.findIndex(({ key }) =>
				key.toString().includes(path.toString())
			);
			if (index === -1) {
				newNode.prev = node;
				node.next.push(newNode);
			} else {
				const insertPoint = node.next[index];
				node[index] = newNode;
				newNode.prev = node;
				newNode.next.push(insertPoint);
				insertPoint.prev = newNode;
			}
		}
	};

	const cleanPathRelation = (path: IAtom) => {
		if (hashBidirectionalList[path].prev) {
			const index = hashBidirectionalList[path].prev.next.findIndex(({ key }) =>
				key.toString().includes(path.toString())
			);
			const parent = hashBidirectionalList[path].prev;
			delete parent.next[index]
			hashBidirectionalList[path].next.forEach((node) => {
				parent.next.push(node);
				node.prev = parent;
			})
		}
		delete hashBidirectionalList[path];
	}

	const deleteNode = (path: IAtom, func: Function): void => {
		// 准确找到node, 如果没有则插入
		// 1. find the point to insert
		// 2. if the insert point has children, then need to check out if need to insert in one of these node
		if (hashBidirectionalList[path]) {
			const node = hashBidirectionalList[path];
			if ('default' in node.value) {
				node.value.default = node.value.default.filter((certainFunc) => certainFunc !== func);
				node.value.customEqualFnList = node.value.customEqualFnList.filter(({ func: certainFunc }) => certainFunc !== func)
				// after the filter, if it is empty, delete it and link to prev, if don't have prev, then stop
				if (node.value.default.length === 0 && node.value.customEqualFnList.length === 0) {
					cleanPathRelation(path);
				}
			} else {
				node.value = node.value.filter((certainFunc) => certainFunc !== func);
				if (node.value.length === 0) {
					cleanPathRelation(path);
				}
			}
		}
	};

	const add = (path: IPath, func: Function): void => {
		if (typeof path === "string" || typeof path === "number") {
			insertNode(path, func);
		} else {
			path.forEach((certainPath) => {
				insertNode(certainPath, func);
			});
		}
	};
	const remove = (path: IPath, func: Function): void => {
		// 准确更具selector 找到相同的func， 并且删除
		if (typeof path === "string" || typeof path === "number") {
			deleteNode(path, func);
		} else {
			path.forEach((certainPath) => {
				deleteNode(certainPath, func);
			});
		}
	};

	// 给最终更改了state之后flush function 使用
	const collect = (pathList: IAtom[]): Function[] => {
		pathList = [
			...Object.keys(
				pathList.reduce(
					(result, certainPath) => ({ ...result, ...split(certainPath) }),
					{}
				)
			),
			""
		];
		return pathList.reduce((result, path) => {
			if (hashBidirectionalList[path]?.value) {
				const funcObject = hashBidirectionalList[path]?.value
				if ('default' in funcObject) {
					return [...result, ...funcObject.default];
				} else {
					return [...result, ...funcObject];
				}
			} else {
				return result;
			}
		}, []);
	};
	return {
		hashBidirectionalList,
		add,
		remove,
		collect
	};
};

export default createHashBidirectionalList;
