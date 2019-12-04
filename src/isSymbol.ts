import getTag from './internal/getTag'

function isSymbol(value: any): boolean {
    const type = typeof value
    return type === 'symbol' || (type === 'object' && value != null && getTag(value) === '[object Symbol]')
}

export default isSymbol
