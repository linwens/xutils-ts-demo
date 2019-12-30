import { toNumber } from '../index'

describe('toNumber', function() {
    var array = [1, 2, 3]

    // it('should return [] no array', function() {
    //   expect(slice(null)).toEqual([]);
    // });
    it('should work with a boolean', function() {
        expect(toNumber(false)).toEqual(0)
    })
    it('should work with a string', function() {
        expect(toNumber(' 1 ')).toEqual(1)
        expect(toNumber('0b11')).toEqual(3)
        expect(toNumber('0o11')).toEqual(9)
        expect(toNumber('0x11')).toEqual(17)
    })
})
