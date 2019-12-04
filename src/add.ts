import createMathOperation from './internal/createMathOperation'

const add = createMathOperation((augend: number, addend: number) => augend + addend, 0)

export default add
