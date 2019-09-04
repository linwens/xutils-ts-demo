type Func = (...args: any[]) => any

interface IOption {
    leading?: boolean
    maxWait?: number
    trailing?: boolean
}

/**
 * 函数去抖，也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
 */

function debounce(func: Func, wait: number = 0, options: IOption = {}): Func {
    let lastArgs: any; /* 上次调用参数 */
    let lastThis: any; /* 上次调用this */
    let maxWait: number = 0; /* 最大等待时间 */
    let result: any; /* 返回结果 */
    let timerId: number | undefined; /* 定时器Id */
    let lastCallTime: number | undefined; /* 上次触发debounced的时间 */

    let lastInvokeTime = 0 /* 上次调用func时间 */
    let leading: boolean = false /* 超时之前 */
    let maxing: boolean | number = false /* 是否传入最大超时时间 */
    let trailing: boolean = true /* 超时之后 */

    const useRAF = !wait && wait !== 0 && typeof requestAnimationFrame === 'function'

    wait = +wait || 0
    if (options) {
        leading = !!options.leading
        maxing = 'maxWait' in options
        maxWait = maxing ? Math.max(+(options.maxWait as number) || 0, wait) : maxWait
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }
    // 触发要执行的函数
    function invokeFunc(time: number) {
        const args = lastArgs
        const thisArg = lastThis

        lastArgs = lastThis = undefined
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        return result
    }

    function startTimer(pendingFunc: Func, time: number) {
        if (useRAF) {
            cancelAnimationFrame(timerId as number)
            return requestAnimationFrame(pendingFunc)
        }
        return self.setTimeout(pendingFunc, time)
    }

    function shouldInvoke(time: number) {
        const timeSinceLastCall = time - (lastCallTime as number)
        const timeSinceLastInvoke = time - lastInvokeTime

        return (
            lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait)
        )
    }

    function leadingEdge(time: number) {
        lastInvokeTime = time
        timerId = startTimer(timerExpired, wait)
        return leading ? invokeFunc(time) : result
    }

    function timerExpired() {
        const time = Date.now()
        if (shouldInvoke(time)) {
            return trailingEdge(time)
        }

        timerId = startTimer(timerExpired, remainingWait(time))
    }

    function trailingEdge(time: number) {
        timerId = undefined

        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastArgs = lastThis = undefined
        return result
    }

    function remainingWait(time: number) {
        const timeSinceLastCall = time - (lastCallTime as number)
        const timeSinceLastInvoke = time - lastInvokeTime
        const timeWaiting = wait - timeSinceLastCall

        return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
    }

    function cancel() {
        if (timerId !== undefined) {
            cancelTimer(timerId)
        }
        lastInvokeTime = 0
        lastArgs = lastCallTime = lastThis = timerId = undefined
    }

    function cancelTimer(id: number) {
        if (useRAF) {
            return cancelAnimationFrame(id)
        }
        clearTimeout(id)
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now())
    }

    function pending() {
        return timerId !== undefined
    }

    function debounced(this: any, ...args: any[]) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time)

        lastArgs = args
        lastThis = this
        lastCallTime = time

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime)
            }
            if (maxing) {
                timerId = startTimer(timerExpired, wait)
                return invokeFunc(lastCallTime)
            }
        }
        if (timerId === undefined) {
            timerId = startTimer(timerExpired, wait)
        }
        return result
    }

    debounced.cancel = cancel
    debounced.flush = flush
    debounced.pending = pending
    return debounced
}

export default debounce
