import { flattenDeep, uniq } from 'lodash'
import Quark from './quark'

const interopMethodTypes = {
  flattenDeep: 'flattenDeep',
  reduce: 'reduce',
  every: 'every',
  loop: 'loop',
}

const defaultMethodDescriptor = {
  type: interopMethodTypes.flattenDeep,
  uniq: true,
  methods: [],
}

const Interop = Quark.createQuark('Interop')
  .deepConf({
    interop: {
      methods: {},
    },
  })
  .statics({
    interopMethodTypes,
    createInteropMethod(name, descriptor) {
      return this.deepConf({
        interop: {
          methods: {
            [name]: Object.assign({}, defaultMethodDescriptor, descriptor),
          },
        },
      }).methods({
        [name](...args) {
          const descriptor = this.getQuark().compose.deepConfiguration.interop
            .methods[name]

          const methods = descriptor.uniq
            ? uniq(descriptor.methods)
            : descriptor.methods

          switch (descriptor.type) {
            case interopMethodTypes.reduce:
              return methods.reduce(
                (accumulator, currentValue) => currentValue.apply(this, [accumulator, ...args.slice(1)])
                  || accumulator,
                args[0],
              )
            case interopMethodTypes.loop:
              return methods.forEach(m => m.apply(this, args))
            case interopMethodTypes.every:
              return methods.every(m => m.apply(this, args))
            case interopMethodTypes.flattenDeep:
            default:
              return flattenDeep(methods.map(m => m.apply(this, args)))
          }
        },
      })
    },
    implementInteropMethod(name, method) {
      return this.deepConf({
        interop: {
          methods: { [name]: { methods: [method] } },
        },
      })
    },
  })

export { Interop, interopMethodTypes }
