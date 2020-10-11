import { } from 'lodash'

export const transform = (data, config) => {
	// 首先将所有mapping的内容做好
	// 再者将所有的function 放到其中
	// 使用curry (getFromOrigin, getFromTransform) => {}
	// 使用generator来执行计算,只允许计算一次,第一次是收集, 第二次执行是真正的执行
	// 如果是Union类型的计算，使用Union([{}, {}, {}])
}