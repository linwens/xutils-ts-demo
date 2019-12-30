import { isObject, map } from '../index'
import { args, slice } from './utils'

describe('isObject', function() {
    it('should return `true` for objects', function() {
        expect(isObject(args)).toStrictEqual(true)
        expect(isObject([1, 2, 3])).toStrictEqual(true)
        expect(isObject(Object(false))).toStrictEqual(true)
        expect(isObject(new Date())).toStrictEqual(true)
        expect(isObject(new Error())).toStrictEqual(true)

        expect(isObject(slice)).toStrictEqual(true)
        expect(isObject({ a: 1 })).toStrictEqual(true)
        expect(isObject(Object(0))).toStrictEqual(true)
        expect(isObject(/x/)).toStrictEqual(true)
        expect(isObject(Object('a'))).toStrictEqual(true)
    })
})
