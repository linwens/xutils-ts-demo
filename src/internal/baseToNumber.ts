import isSymbol from '../isSymbol'

const NAN = 0 / 0 // 0/0 => NaN
function baseToNumber(value: any): number {
    if (typeof value === 'number') {
        return value
    }
    if (isSymbol(value)) {
        return NAN
    }
    return +value // +把数据强制转为 number类型, +'String' => NaN  +[1,2,3] => NaN
}

export default baseToNumber
