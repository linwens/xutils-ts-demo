type Func = (...arg: any) => any

function baseSum(array: any[], iteratee: Func) {
    let result

    for (const value of array) {
        // 剥离出数值，然后进行累加
        const current = iteratee(value)
        if (current !== undefined) {
            result = result === undefined ? current : result + current
        }
    }
    return result
}

export default baseSum
