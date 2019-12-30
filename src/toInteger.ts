import toFinite from './toFinite'

function toInteger(value: any) {
    const result = toFinite(value)
    // 3.2 % 1 => 0.20000000000000018 ; 3 % 1 => 0
    const remainder = result % 1 // 获取到result的小数位，如果有的话
    // result - remainder 不受浮点数插值影响
    return remainder ? result - remainder : result
}

export default toInteger
