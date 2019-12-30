/** Used as a reference to the global object. */
var root = (typeof global == 'object' && global) || this || globalThis

var ArrayBuffer = root.ArrayBuffer,
    Map = root.Map,
    Promise = root.Promise,
    Set = root.Set,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    WeakMap = root.WeakMap,
    WeakSet = root.WeakSet

var arrayBuffer = ArrayBuffer ? new ArrayBuffer(2) : undefined,
    map = Map ? new Map() : undefined,
    set = Set ? new Set() : undefined,
    symbol = Symbol ? Symbol('a') : undefined,
    weakMap = WeakMap ? new WeakMap() : undefined,
    weakSet = WeakSet ? new WeakSet() : undefined

/** Used for native method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype,
    numberProto = Number.prototype,
    stringProto = String.prototype

/** 将数组转为 arguments */
function toArgs(array: any) {
    return function() {
        return arguments
    }.apply(undefined, array)
}

var falsey = [, null, undefined, false, 0, NaN, '']

var stubArray = function() {
    return []
}

var stubTrue = function() {
        return true
    },
    stubFalse = function() {
        return false
    }

var args = toArgs([1, 2, 3]),
    realm = {},
    slice = arrayProto.slice

export { falsey, stubArray, args, realm, slice, symbol, stubFalse, toArgs }
