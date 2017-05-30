import { inspect } from 'util'
import '../src/quarkit-mixin'


let fn = (arg1, arg2) => {
  return arg1 + arg2
}

describe('curry', () => {
  it('should be ok 😉', () => {
    let curried = fn.curry(5)

    expect(curried(5)).toBe(10);
  });
});