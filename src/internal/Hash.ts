const HASH_UNDEFINED = '__lodash_hash_undefined__'

class Hash {
    private __data__ = Object.create(null)
    private size = 0

    constructor(entries: any[]) {
        let index = -1
        const length = entries == null ? 0 : entries.length

        while (++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }

    clear() {
        this.__data__ = Object.create(null)
        this.size = 0
    }

    set(key: string, value: any) {
        const data = this.__data__
        this.size += this.has(key) ? 0 : 1
        data[key] = value === undefined ? HASH_UNDEFINED : value
        return this
    }

    has(key: string) {
        const data = this.__data__
        return data[key] !== undefined
    }

    delete(key: string) {
        const result = this.has(key) && delete this.__data__[key]
        this.size -= result ? 1 : 0
        return result
    }

    get(key: string) {
        const data = this.__data__
        const result = data[key]
        return result === HASH_UNDEFINED ? undefined : result
    }
}

export default Hash
