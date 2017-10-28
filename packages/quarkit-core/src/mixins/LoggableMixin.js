import { Mixin } from 'quarkit-mixin'
import log from 'loglevel'
export const LoggableMixin = Mixin((superclass) => class extends superclass {

  get Log() {
    return this._customLogger || log
  }

  createLogger(name) {
    this._customLogger = log.getLogger("module-one")
  }

})

export default LoggableMixin