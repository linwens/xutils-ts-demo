import isObject from './isObject'
import isSymbol from './isSymbol'

const NAN = 0 / 0
/** 匹配头尾空白 */
const reTrim = /^\s+|\s+$/g
/** 匹配十六进制 0x前缀 */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i
/** 匹配二进制 0b前缀 */
const reIsBinary = /^0b[01]+$/i
/** 匹配八进制 0o前缀 */
const reIsOctal = /^0o[0-7]+$/i

const freeParseInt = parseInt

function toNumber(value: any): number {
    if (typeof value === 'number') {
        return value
    }
    if (isSymbol(value)) {
        return NAN
    }
    if (isObject(value)) {
        // valueOf() =>
        const other = typeof value.valueOf === 'function' ? value.valueOf() : value
        value = isObject(other) ? `${other}` : other
    }
    if (typeof value !== 'string') {
        return value === 0 ? value : +value
    }
    value = value.replace(reTrim, '')
    const isBinary = reIsBinary.test(value)
    return isBinary || reIsOctal.test(value)
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : reIsBadHex.test(value)
        ? NAN
        : +value
}

export default toNumber

// https://segmentfault.com/a/1190000014454306
