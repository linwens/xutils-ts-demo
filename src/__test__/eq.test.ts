import { eq } from '../index'

describe('eq', function() {
    it('should perform a `SameValueZero` comparison of two values', function() {
        expect(eq()).toStrictEqual(true)
        expect(eq(undefined)).toStrictEqual(true)
        expect(eq(0, -0)).toStrictEqual(true)
        expect(eq(NaN, NaN)).toStrictEqual(true)
        expect(eq(1, 1)).toStrictEqual(true)

        expect(eq(null, undefined)).toStrictEqual(false)
        expect(eq(1, Object(1))).toStrictEqual(false)
        expect(eq(1, '1')).toStrictEqual(false)
        expect(eq(1, '1')).toStrictEqual(false)

        var object = { a: 1 }
        expect(eq(object, object)).toStrictEqual(true)
        expect(eq(object, { a: 1 })).toStrictEqual(false)
    })
})
