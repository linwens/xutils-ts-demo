import { DeBounce } from '../index'

interface func {
    (...args: any[]): any
}
let identity: func = function(value) {
    return value
}

let argv = process ? process.argv : undefined

describe('debounce', function() {
    it('should debounce a function', function(done) {
        var callCount = 0
        var debounced = DeBounce(function(value: any) {
            ++callCount
            return value
        }, 32)

        var results = [debounced('a'), debounced('b'), debounced('c')]
        expect(results).toEqual([undefined, undefined, undefined])
        expect(callCount).toStrictEqual(0)

        setTimeout(function() {
            expect(callCount).toStrictEqual(1)

            var results = [debounced('d'), debounced('e'), debounced('f')]
            expect(results).toEqual(['c', 'c', 'c'])
            expect(callCount).toStrictEqual(1)
        }, 128)

        setTimeout(() => {
            expect(callCount).toStrictEqual(2)
            done()
        }, 256)
    })

    it('subsequent debounced calls return the last `func` result', function(done) {
        var debounced = DeBounce(identity, 32)
        debounced('a')

        setTimeout(function() {
            expect(debounced('b')).not.toStrictEqual('b')
        }, 64)

        setTimeout(function() {
            expect(debounced('c')).not.toStrictEqual('c')
            done()
        }, 128)
    })

    it('should not immediately call `func` when `wait` is `0`', function(done) {
        var callCount = 0,
            debounced = DeBounce(function() {
                ++callCount
            }, 0)

        debounced()
        debounced()
        expect(callCount).toStrictEqual(0)

        setTimeout(function() {
            expect(callCount).toStrictEqual(1)
            done()
        }, 5)
    })

    it('should apply default options', function(done) {
        var callCount = 0,
            debounced = DeBounce(
                function() {
                    callCount++
                },
                32,
                {},
            )

        debounced()
        expect(callCount).toStrictEqual(0)

        setTimeout(function() {
            expect(callCount).toStrictEqual(1)
            done()
        }, 64)
    })

    it('should support a `leading` option', function(done) {
        var callCounts = [0, 0]

        var withLeading = DeBounce(
            function() {
                callCounts[0]++
            },
            32,
            { leading: true },
        )

        var withLeadingAndTrailing = DeBounce(
            function() {
                callCounts[1]++
            },
            32,
            { leading: true },
        )

        withLeading()
        expect(callCounts[0]).toStrictEqual(1)

        withLeadingAndTrailing()
        withLeadingAndTrailing()
        expect(callCounts[1]).toStrictEqual(1)

        setTimeout(function() {
            expect(callCounts).toEqual([1, 2])

            withLeading()
            expect(callCounts[0]).toStrictEqual(2)

            done()
        }, 64)
    })

    it('subsequent leading debounced calls return the last `func` result', function(done) {
        var debounced = DeBounce(identity, 32, { leading: true, trailing: false }),
            results = [debounced('a'), debounced('b')]

        expect(results).toEqual(['a', 'a'])

        setTimeout(function() {
            var results = [debounced('c'), debounced('d')]
            expect(results).toEqual(['c', 'c'])
            done()
        }, 64)
    })

    it('should support a `trailing` option', function(done) {
        var withCount = 0,
            withoutCount = 0

        var withTrailing = DeBounce(
            function() {
                withCount++
            },
            32,
            { trailing: true },
        )

        var withoutTrailing = DeBounce(
            function() {
                withoutCount++
            },
            32,
            { trailing: false },
        )

        withTrailing()
        expect(withCount).toStrictEqual(0)

        withoutTrailing()
        expect(withoutCount).toStrictEqual(0)

        setTimeout(function() {
            expect(withCount).toStrictEqual(1)
            expect(withoutCount).toStrictEqual(0)
            done()
        }, 64)
    })

    it('should support a `maxWait` option', function(done) {
        var callCount = 0

        var debounced = DeBounce(
            function(value) {
                ++callCount
                return value
            },
            32,
            { maxWait: 64 },
        )

        debounced()
        debounced()
        expect(callCount).toStrictEqual(0)

        setTimeout(function() {
            expect(callCount).toStrictEqual(1)
            debounced()
            debounced()
            expect(callCount).toStrictEqual(1)
        }, 128)

        setTimeout(function() {
            expect(callCount).toStrictEqual(2)
            done()
        }, 256)
    })

    it('should support `maxWait` in a tight loop', function(done) {
        var limit = argv ? 1000 : 320,
            withCount = 0,
            withoutCount = 0

        var withMaxWait = DeBounce(
            function() {
                withCount++
            },
            64,
            { maxWait: 128 },
        )

        var withoutMaxWait = DeBounce(function() {
            withoutCount++
        }, 96)

        var start = +new Date()
        while (+new Date() - start < limit) {
            withMaxWait()
            withoutMaxWait()
        }
        var actual = [Boolean(withoutCount), Boolean(withCount)]
        setTimeout(function() {
            expect(actual).toEqual([false, true])
            done()
        }, 1)
    })

    it('should queue a trailing call for subsequent debounced calls after `maxWait`', function(done) {
        var callCount = 0

        var debounced = DeBounce(
            function() {
                ++callCount
            },
            200,
            { maxWait: 200 },
        )

        debounced()

        setTimeout(debounced, 190)
        setTimeout(debounced, 200)
        setTimeout(debounced, 210)

        setTimeout(function() {
            expect(callCount).toStrictEqual(2)
            done()
        }, 500)
    })

    it('should cancel `maxDelayed` when `delayed` is invoked', function(done) {
        var callCount = 0

        var debounced = DeBounce(
            function() {
                callCount++
            },
            32,
            { maxWait: 64 },
        )

        debounced()

        setTimeout(function() {
            debounced()
            expect(callCount).toStrictEqual(1)
        }, 128)

        setTimeout(function() {
            expect(callCount).toStrictEqual(2)
            done()
        }, 192)
    })

    it('should invoke the trailing call with the correct arguments and `this` binding', function(done) {
        var actual: any,
            callCount = 0,
            object = {}

        var debounced = DeBounce(
            function(this: any, ...args: any[]) {
                actual = [this]
                Array.prototype.push.apply(actual, args)
                return ++callCount != 2
            },
            32,
            { leading: true, maxWait: 64 },
        )

        while (true) {
            if (!debounced.call(object, 'a')) {
                break
            }
        }
        setTimeout(function() {
            expect(callCount).toStrictEqual(2)
            expect(actual).toEqual([object, 'a'])
            done()
        }, 64)
    })
})
