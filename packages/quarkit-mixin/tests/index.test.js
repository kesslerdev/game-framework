import * as mixin from '../src'

const Obj = class {}

describe('mixins', () => {
  describe('apply() and isApplicationOf()', () => {
    it('apply() applies a mixin function', () => {
      const M = (s) => class extends s {
        test() {
          return true
        }
      };

      class Test extends mixin.apply(Obj, M) {}

      const i = new Test()

      expect(i.test()).toBeTruthy()
    })

    it('isApplicationOf() returns true for a mixin applied by apply()', () => {
      const M = (s) => class extends s {}
      expect(mixin.isApplicationOf(mixin.apply(Obj, M).prototype, M)).toBeTruthy()
    });

    test('isApplicationOf() works with wrapped mixins', () => {
      const M = (s) => class extends s {}
      const WrappedM = mixin.wrap(M, (superclass) => mixin.apply(superclass, M))
      expect(mixin.isApplicationOf(WrappedM(Obj).prototype, WrappedM)).toBeTruthy()
    });

    test('isApplicationOf() returns false when it should', () => {
      const M = (s) => class extends s {}
      const X = (s) => class extends s {}
      expect(mixin.isApplicationOf(mixin.apply(Obj, M).prototype, X)).toBeFalsy()
    });
  })

  describe('hasMixin()', () => {
    it('hasMixin() returns true for a mixin applied by apply()', () => {
      const M = (s) => class extends s {}

      expect(mixin.hasMixin(mixin.apply(Obj, M).prototype, M)).toBeTruthy()
    });
  })
})

// next https://github.com/justinfagnani/mixwith.js/blob/master/test/mix-test.js#L62