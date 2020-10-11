import { typeOf } from "../utils"

export const union = (list: any[]) => {
	return list.reduce((result, item) => {
		if (typeOf(item) === 'set') {
			return new Set([...result, ...item])
		} else {
			return result.add(item)
		}
	}, new Set([]))
}