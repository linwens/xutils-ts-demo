import { ceil } from '../index'

describe('ceil', function() {
    it('should return a rounded number without a precision', function() {
        expect(ceil(4.263)).toStrictEqual(5)
    })

    it('should work with a precision of `0`', function() {
        expect(ceil(4.263, 0)).toStrictEqual(5)
    })

    it('should work with a positive precision', function() {
        expect(ceil(4.263, 2)).toStrictEqual(4.27)
    })

    it('should work with a negative precision', function() {
        expect(ceil(6040, -2)).toStrictEqual(6100)
    })

    it('should coerce `precision` to an integer', function() {
        expect(ceil(4.263, NaN)).toStrictEqual(5)
    })

    it('should work with exponential notation and `precision`', function() {
        expect(ceil(5e1, 2)).toStrictEqual(50)
    })
})
