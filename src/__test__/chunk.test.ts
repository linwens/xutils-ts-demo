import { chunk, map } from '../index'
import { falsey, stubArray } from './utils'

describe('chunk', function() {
    var array = [0, 1, 2, 3, 4, 5]

    it('should return chunked arrays', function() {
        var actual = chunk(array, 3)
        expect(actual).toEqual([[0, 1, 2], [3, 4, 5]])
    })

    it('should return the last chunk as remaining elements', function() {
        var actual = chunk(array, 4)
        expect(actual).toEqual([[0, 1, 2, 3], [4, 5]])
    })

    it('should treat falsey `size` values, except `undefined`, as `0`', function() {
        var expected = map(falsey, function(value) {
            return value === undefined ? [[0], [1], [2], [3], [4], [5]] : []
        })

        var actual = map(falsey, function(size, index) {
            return index ? chunk(array, size) : chunk(array)
        })
        expect(actual).toEqual(expected)
    })

    // it('should ensure the minimum `size` is `0`', function() {

    // });

    it('should coerce `size` to an integer', function() {
        expect(chunk(array, array.length / 4)).toEqual([[0], [1], [2], [3], [4], [5]])
    })
})
