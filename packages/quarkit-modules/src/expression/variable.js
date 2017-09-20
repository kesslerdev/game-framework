const math = require('quarkit-mathjs')

export class StaticVariable {
  value

  constructor(value) {
    this.value = value
  }

  getValue() {
    return this.value
  }
}

export class ExpressionVariable {
  expression
  _contextAccessor

  get Context() {
    return this._contextAccessor()
  }

  constructor(expr) {
    this.expression = expr
  }

  setContextAccessor(contextAccessor) {
    this._contextAccessor = contextAccessor
  }

  getValue() {
      // TODO: can have a callback to dispatch new value information to expression container
    const value = math.eval(this.expression, this.Context)
    console.log(this.expression, value)
    return value
  }
}

export function variableCreator(value) {
  if (typeof (value) === 'string') {
    return new ExpressionVariable(value)
  }
  return new StaticVariable(value)
}
