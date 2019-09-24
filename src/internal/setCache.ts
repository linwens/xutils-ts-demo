import MapCache from './MapCache.js'

const HASH_UNDEFINED = '__lodash_hash_undefined__'

class SetCache {
    __data__ = Object.create(null)

    constructor(values: any[]) {
        let index = -1
        const length = values == null ? 0 : values.length

        this.__data__ = new MapCache()
        while (++index < length) {
            this.add(values[index])
        }
    }

    add(value: any): Object {
        this.__data__.set(value, HASH_UNDEFINED)
        return this
    }

    push: (value: any) => Object

    has(value: any): number {
        return this.__data__.has(value)
    }
}

SetCache.prototype.push = SetCache.prototype.add

export default SetCache
