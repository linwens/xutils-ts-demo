import isSymbol from '../isSymbol'

const INFINITY = 1 / 0
const symbolToString = Symbol.prototype.toString

function baseToString(value: any): string {
    if (typeof value === 'string') {
        return value
    }
    if (Array.isArray(value)) {
        // 递归数组
        return `${value.map(baseToString)}` // `${[1,2,3]}` => '1,2,3' 类似 join
    }
    if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : ''
    }

    const result = `${value}` // 其他情况直接转为字符串 对象=>"[object Object]" 数组=>'1,2,3'
    return result === '0' && 1 / value === -INFINITY ? '-0' : result
}

export default baseToString
