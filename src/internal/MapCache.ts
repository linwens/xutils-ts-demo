import Hash from './Hash'

function getMapData({ __data__ }, key: string) {
    const data = __data__
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map
}

function isKeyable(value: any): boolean {
    const type = typeof value
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean'
        ? value !== '__proto__'
        : value === null
}

class MapCache {
    __data__ = {
        hash: new Hash(),
        map: new Map(),
        string: new Hash(),
    }
    size = 0

    constructor(entries?: any[]) {
        let index = -1
        const length = entries == null ? 0 : entries.length
        this.clear()
        while (++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }

    clear() {
        this.size = 0
        this.__data__ = {
            hash: new Hash([]),
            map: new Map(),
            string: new Hash([]),
        }
    }

    set(key: string, value: any): Object {
        const data = getMapData(this, key)
        const size = data.size

        data.set(key, value)
        this.size += data.size == size ? 0 : 1
        return this
    }

    delete(key: string): boolean {
        const result = getMapData(this, key)['delete'](key)
        this.size -= result ? 1 : 0
        return result
    }

    get(key: string) {
        return getMapData(this, key).get(key)
    }

    has(key: string): boolean {
        return getMapData(this, key).has(key)
    }
}

export default MapCache
