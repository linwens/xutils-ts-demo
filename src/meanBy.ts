// 引入一个求和函数
import baseSum from './internal/baseSum'

type Func = (...arg: any) => any

const NaN = 0 / 0

/**
 *
 * @param array
 * @param iteratee 当第一个传参array内的数组项是复杂类型时，iteratee用于剥离出数值
 */
function meanBy(array: any[], iteratee: Func) {
    const length = array == null ? 0 : array.length
    // 总和 / 总数 = 平均值
    return length ? baseSum(array, iteratee) as any / length : NaN
}

export default meanBy
