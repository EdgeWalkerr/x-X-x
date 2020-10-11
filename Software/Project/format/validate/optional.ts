import { union } from "lodash"
import { typeOf } from "../utils"

export const optional = (value) => {
	// 如果已经是set类型的了， 直接合并
	if (typeOf(value) === 'set') {
		return union([...value, undefined])
	} else {
		return union([value, undefined])
	}
}