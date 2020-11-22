export type ISelector = (
	selector: ISelectorPath,
	equalFn?: IEqual
) => any;

export type IAtom = string | number;

export type IPath = IAtom | IAtom[]

export type ISelectorPath = IPath | Record<string, IAtom>

export type IEqual = (a: any, b: any) => boolean;
