import stampit from '@stamp/it'
import { uniq, omit, cloneDeep } from 'lodash'
import cleanName from './cleanName'

const Quark = stampit
  .deepConf({
    quarks: ['Quark'],
  })
  .init(function (arg) {
    this.initArg = arg
  })
  .methods({
    clone() {
      return Object.assign(
        this.getQuark()(cloneDeep(this.initArg)),
        cloneDeep(
          omit(this, [
            'initArg',
            ...Object.keys(this.getQuark().compose.propertyDescriptors || {}),
            ...Object.keys(this.getQuark().compose.methods || {}),
          ]),
        ),
      )
    },
  })
  .statics({
    quark: 'Quark',
    createQuark(name) {
      return this.deepConf({
        quarks: [cleanName(name)],
      }).statics({
        quark: cleanName(name),
      })
    },
    getDeepConf() {
      return this.compose.deepConfiguration
    },
    getConf() {
      return this.compose.configuration
    },
  })
  .staticPropertyDescriptors({
    quarks: {
      get() {
        return uniq(this.compose.deepConfiguration.quarks)
      },
    },
  })
  .composers(({ stamp }) => {
    stamp.compose.methods.getQuark = () => stamp

    Object.defineProperty(stamp, Symbol.hasInstance, {
      // mutating stamp
      value(obj) {
        return (
          obj
          && typeof obj.getQuark === 'function'
          && (stamp.quark === obj.getQuark().quark
            || obj
              .getQuark()
              .compose.deepConfiguration.quarks.some(s => s === stamp.quark))
        )
      },
    })
  })

export default Quark
