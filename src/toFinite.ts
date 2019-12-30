import toNumber from './toNumber'

const INFINITY = 1 / 0 // => Infinity
const MAX_INTEGER = 1.7976931348623157e308 // Number.MAX_VALUE

function toFinite(value: any) {
    if (!value) {
        return value === 0 ? value : 0
    }
    value = toNumber(value)
    if (value === INFINITY || value === -INFINITY) {
        const sign = value < 0 ? -1 : 1
        return sign * MAX_INTEGER
    }
    return value === value ? value : 0
}

export default toFinite
