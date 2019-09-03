import { ArrayEach } from '../index'

test('My ArrayEach', () => {
    expect(
        ArrayEach([1, 2], (el: number, idx: number, array: number[]) => {
            array[idx] = el * el
        }),
    ).toStrictEqual([1, 4])
})
