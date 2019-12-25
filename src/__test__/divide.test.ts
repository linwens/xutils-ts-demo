import { divide } from '../index'

describe('divide', function() {
    it('should divide two numbers', function() {
        expect(divide(6, 4)).toStrictEqual(1.5)
        expect(divide(-6, 4)).toStrictEqual(-1.5)
        expect(divide(-6, -4)).toStrictEqual(1.5)
    })

    it('', function() {
        expect(divide('6', '4')).toStrictEqual(1.5)
        expect(divide('x', 'y')).toEqual(NaN)
    })
})
