import { inspect } from 'util'
import { classAsMixin, Extendable } from '../src/quarkit-mixin'


describe('mixin', () => {

  it('should create Properties needed if not present', () => {
    // create mixin
    class classMixinA {
      get propA() : number {
        return  1
      }
    }

    class classMixinB {
      get propA() : number {
        return  1
      }

      constructor() {
        this.x = 15
      }
    }

    function xY() {
      this.y = 1
    }

    const mixinA = classAsMixin(classMixinA)
    const mixinB = classAsMixin(classMixinB)

    class z extends Extendable {

    }

    mixinB(z)

    const b = new z()

    expect(b.x).toBe(15)


  })

})
