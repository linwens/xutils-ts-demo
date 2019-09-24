import eq from '../eq.js'

function assocIndexOf(array: any[], key: any): number {
    let { length } = array
    while (length--) {
        if (eq(array[length][0], key)) {
            return length
        }
    }
    return -1
}

export default assocIndexOf
