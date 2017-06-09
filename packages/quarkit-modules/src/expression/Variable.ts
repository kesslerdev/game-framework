const math = require('quarkit-mathjs')

export class StaticVariable{
  Value : any
    
  constructor(value: any) {
    this.Value = value
  }

  getValue() : any {
    return this.Value
  }
}

export class ExpressionVariable{
    Expression : string
    private _contextAccessor:Function

    get Context() : any {
        return this._contextAccessor()
    }
    
    constructor(expr: string) {
        this.Expression = expr
    }

    setContextAccessor(contextAccessor : Function) {
        this._contextAccessor = contextAccessor
    }

    getValue() : any {
        return math.eval(this.Expression, this.Context)
    }
}

export interface IVariable{
    getValue() : any
}

export function VariableCreator(value : any) : IVariable {
    if (typeof(value) === 'string') {
        return new ExpressionVariable(value)
    } else if (typeof(value) === 'number') {
        return new StaticVariable(value)
    }
}