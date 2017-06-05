import { inspect } from 'util'
import { mixin } from './quarkit-mixin'

export function classAsMixin(proto): any {
  if (typeof proto !== 'function') {
    throw new Error('classAsMixin must be used on a class not a ' + typeof proto)
  }
  const propsNames = Reflect
                      .ownKeys(proto.prototype)
                      .filter(n => n !== 'constructor')
  const props = {}

  propsNames.map((n) => {
    Object.defineProperty(props, n, Object.getOwnPropertyDescriptor(proto.prototype, n)
  })

  const constructor = proto.prototype.constructor
  console.log(inspect(constructor,true,5,true))
  
  return mixin(constructor.name, props, constructor)
}
