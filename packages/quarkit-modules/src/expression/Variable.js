const math = require('quarkit-mathjs')

export class Variable {
  expression
  _contextAccessor
  _onUpdateCallback
  _oldVal

  get Context() {
    return this._contextAccessor()
  }

  constructor(expr) {
    this.expression = expr
  }

  setContextAccessor(contextAccessor) {
    this._contextAccessor = contextAccessor
  }

  setOnUpdateCallback(onUpdateCallback) {
    this._onUpdateCallback = onUpdateCallback
  }

  get Value() {
    if (typeof (this.expression) !== 'string') {
      return this.expression
    }

    let value = null
    try {
      value = math.eval(this.expression, this.Context)
    } catch (e) {
      console.warn(`Error during parsing Expression ${this.expression}, error : `, e)
    }

    if (this._oldVal !== undefined && value !== null && value !== this._oldVal) {
      this._onUpdateCallback(this._oldVal, value)
    }
    this._oldVal = value
    return value
  }

  set Value(value) {
    this.expression = value
    // trigger callback if needed
    console.log(`Update variable evaluated = ${this.Value}`)
  }
}
