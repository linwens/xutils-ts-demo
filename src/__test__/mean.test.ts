import { mean, map } from '../index'

describe('mean', function() {
    it('should return the mean of an array of numbers', function() {
        var array = [4, 2, 8, 6]
        expect(mean(array)).toStrictEqual(5)
    })

    it('should return `NaN` when passing empty `array` values', function() {
        var empties = [[], {}, null, undefined, false, 0, NaN, '']
        var stubNaN = function() {
            return NaN
        }
        var expected = map(empties, stubNaN)
        var actual = map(empties, mean)

        expect(actual).toEqual(expected)
    })
})
