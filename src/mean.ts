import baseMean from './meanBy'

function mean(array: any[]) {
    // mean方法，只需要传个array, 所以baseMean里的 iteratee函数 直接就是返回value
    return baseMean(array, (value: number) => value)
}

export default mean
