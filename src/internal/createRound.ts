type Func = (...args: any) => any

function createRound(methodName: keyof typeof Math) {
    const func = Math[methodName] as Func // 强制转函数

    return (num: number, precision = 0) => {
        precision = precision == null ? 0 : precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292)
        if (precision) {
            let pair = `${num}e`.split('e')
            // 用指数计数法，进行*1000.. 或者/1000 避免乘除中会出现浮点数不精确的问题；
            // 通过Math原生的方法进行数字处理
            const value = func(`${pair[0]}e${+pair[1] + precision}`) // +'' => 0; e2 => 1*100

            pair = `${value}e`.split('e')
            return +`${pair[0]}e${+pair[1] - precision}` // e-2 => 1/100
        }
        return func(num)
    }
}

export default createRound
