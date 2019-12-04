import baseToNumber from './baseToNumber'
import baseToString from './baseToString'

// 定义一个Func类型，限定回调函数的类型
type Func = (...args: number[]) => any

function createMathOperation(operator: Func, defaultValue: number) {
    return (value: any, other: any) => {
        if (value === undefined && other === undefined) {
            return defaultValue
        }
        if (value !== undefined && other === undefined) {
            return value
        }
        if (other !== undefined && value === undefined) {
            return other
        }
        // 有一个字符串就按字符串拼接
        if (typeof value === 'string' || typeof other === 'string') {
            value = baseToString(value)
            other = baseToString(other)
        }
        // 其他情况都强转数值类型
        else {
            value = baseToNumber(value)
            other = baseToNumber(other)
        }
        return operator(value, other)
    }
}

export default createMathOperation
