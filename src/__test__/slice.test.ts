import { slice } from '../index'

describe('slice', function() {
    var array = [1, 2, 3]

    // it('should return [] no array', function() {
    //   expect(slice(null)).toEqual([]);
    // });
    it('should work with a negative `start`', function() {
        expect(slice(array, -1)).toEqual([3])
    })
    it('should work with a negative `end`', function() {
        expect(slice(array, 0, -1)).toEqual([1, 2])
    })
})
