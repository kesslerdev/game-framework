var math = require('quarkit-mathjs')

export class StaticVariable{
    Value : any
    
    constructor(value: any) {
        this.Value = value
    }

    getValue() : any{
        return this.Value
    }
}

export class ExpressionVariable{
    Expression : string
    Context : any
    
    constructor(expr: string) {
        this.Expression = expr
    }

    setContext(context : any) {
        this.Context = context
    }

    getValue() : any{
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