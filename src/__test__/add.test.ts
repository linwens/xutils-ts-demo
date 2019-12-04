import { add } from '../index'

describe('add', function() {
    it('should add two numbers', function() {
        expect(add(6, 4)).toStrictEqual(10)
        expect(add(-6, 4)).toStrictEqual(-2)
        expect(add(-6, -4)).toStrictEqual(-10)
    })

    it('should not coerce arguments to numbers', function() {
        expect(add('6', '4')).toStrictEqual('64')
        expect(add('x', 'y')).toStrictEqual('xy')
        expect(add(6, '4')).toStrictEqual('64')
        expect(add([1, 2, 3], '4')).toStrictEqual('1,2,34')
        expect(add([1, 2, 3], 4)).toStrictEqual(NaN)
        expect(add(undefined, undefined)).toStrictEqual(0)
        expect(add(undefined, 4)).toStrictEqual(4)
        expect(add(6, undefined)).toStrictEqual(6)
        expect(add(null, '4')).toStrictEqual('null4')
        expect(add(null, 4)).toStrictEqual(4)

        let a = Symbol()
        expect(add(a, null)).toStrictEqual(NaN)
        expect(add(a, 'null')).toStrictEqual('Symbol()null')
    })
})
