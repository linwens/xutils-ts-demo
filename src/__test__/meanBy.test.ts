import { meanBy } from '../index'

describe('meanBy', function() {
    var objects = [{ a: 2 }, { a: 3 }, { a: 1 }]

    it('should work with an `iteratee`', function() {
        var actual = meanBy(objects, function(obj: any) {
            return obj.a
        })

        expect(actual).toEqual(2)
    })

    it('should provide correct `iteratee` arguments', function() {
        var args: any
        meanBy(objects, function() {
            args || (args = Array.prototype.slice.call(arguments))
        })

        expect(args).toEqual([{ a: 2 }])
    })

    it('should work with `_.property` shorthands', function() {
        var arrays = [[2], [3], [1]]
        // expect(meanBy(arrays, 0)).toStrictEqual(2);
        // expect(meanBy(objects, 'a')).toStrictEqual(2);
    })
})
