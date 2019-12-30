import slice from './slice'
import toInteger from './toInteger'

function chunk(array: any[], size = 1) {
    size = Math.max(toInteger(size), 0)
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
        return []
    }
    let index = 0
    let resIndex = 0
    // Math.ceil向上取整，因为会有余数的情况
    const result = new Array(Math.ceil(length / size))

    while (index < length) {
        result[resIndex++] = slice(array, index, (index += size))
    }
    return result
}

export default chunk
