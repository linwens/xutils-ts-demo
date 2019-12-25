import isSymbol from './isSymbol'

type Func = (...arg: any) => any

function maxBy(array: [], iteratee: Func) {
    let result
    if (array == null) {
        return result
    }
    let computed
    for (const value of array) {
        const current = iteratee(value)
        if (
            current != null &&
            (computed === undefined ? current === current && !isSymbol(current) : current > computed)
        ) {
            computed = current
            result = value
        }
    }

    return result
}

export default maxBy
