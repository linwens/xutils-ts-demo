import { map } from '../index'
import { isRegExp } from 'util'

describe('map', function() {
    var array = [1, 2]

    it('should map values in `collection` to a new array', function() {
        var expected = ['1', '2']

        expect(map(array, String)).toEqual(expected)
    })

    it('should provide correct `predicate` arguments in a lazy sequence', function() {})
})
