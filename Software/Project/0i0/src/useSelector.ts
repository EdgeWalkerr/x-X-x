import { ISelector } from "./type";
import { useContext } from "react";
import Context from "./Context";

const useSelector: ISelector = (selector, equalFn) =>
	useContext(Context)(selector, equalFn);

export default useSelector;
