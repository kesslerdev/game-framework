const math = require('quarkit-mathjs')

export class StaticVariable{
  value
    
  constructor(value) {
    this.value = value
  }

  getValue() {
    return this.value
  }
}

export class ExpressionVariable{
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
      const value = math.eval(this.expression, this.Context)
      console.log(this.expression, value)
      return value
    }
}

export function variableCreator(value) {
    if (typeof(value) === 'string') {
        return new ExpressionVariable(value)
    } else if (typeof(value) === 'number') {
        return new StaticVariable(value)
    }
}