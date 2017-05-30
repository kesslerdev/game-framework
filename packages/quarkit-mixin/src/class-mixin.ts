import { inspect } from 'util'
import { mixin } from './quarkit-mixin'

export function classAsMixin(proto, options : { dependencies?:Array<string> } = {}): any {
  if (typeof proto !== 'function') {
    throw new Error('classAsMixin must be used on a class not a ' + typeof proto)
  }
  
  const propsNames = Reflect
                      .ownKeys(proto.prototype)
                      .filter(n => n !== 'constructor' && n !== 'initialize')
  const props = {}

  propsNames.map((n) => {
    Object.defineProperty(props, n, Object.getOwnPropertyDescriptor(proto.prototype, n))
  })

  let constructor
  if (Reflect.has(proto.prototype,'initialize')) {
    constructor = (go) => {
      proto.prototype['initialize'].call(go)
    }
  }
  
  return mixin(proto.prototype.constructor.name, props, constructor, options)
}

