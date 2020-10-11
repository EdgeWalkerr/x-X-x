import { mapValues, isEqual, range } from 'lodash'
export * from './optional'
export * from './union'
import { typeOf } from '../utils'

// 使用层次遍历

const validate = (data, config, path, errorMessage: (path, extra?: string) => any) => {
	if (['boolean', 'number', 'string', 'undefined', 'bigint', 'null', 'object', 'array'].includes(typeOf(data)) && typeOf(data) !== typeOf(config)) {
		console.error(errorMessage(path, `${typeof config} is not supported`));
		return config
	}
	switch (typeOf(config)) {
		case 'boolean':
		case 'number':
		case 'string':
		case 'undefined':
		case 'bigint':
		case 'null':
			return data

		case 'object':
			return mapValues(config, (value, key) => validate(data[key], value, [...path, key], errorMessage([...path, key])));

		case 'array' && config.length > 1:
			return config.map((value, index) => validate(data[index], value, [...path, index], errorMessage([...path, index])));

		case 'array' && config.length === 1:
			return data.map((value) => typeOf(value) === typeOf(config[0]) ? value : config[0])
		// 	case 'set':
		// // todo
		// return config

		case 'symbol': {
			const constant = JSON.parse(config.toString().slice(7, -1));
			if (!isEqual(data, constant)) {
				console.error(errorMessage(path, `constant is not equal`));
			}
			return constant
		}

		default:
			console.error(errorMessage(path, `config ${config} format is not supported`));
			return config;

	}
}
// 使用尾递归来优化性能

validate(range(200).map(() => ({
	a: 1,
	b: '1',
	c: '12',
	e: 'asf'
})), [{
	a: 1,
	b: '1',
	c: '12',
	e: 'adafd'
}], [], (path) => path.join('')) //?.