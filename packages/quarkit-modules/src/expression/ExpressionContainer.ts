import { mixin } from 'quarkit-mixin'
import { VariableCreator, ExpressionVariable, IVariable } from './Variable'


export const ExpressionContainer = mixin('ExpressionContainer', {
    createVariable(value:string) : IVariable {
        let variable = VariableCreator(value)
        if (variable instanceof ExpressionVariable) {
            variable.setContextAccessor(() => {
                return this.Context
            })
        }
        return variable
    },
    setContext(key,value) {
        this.Context[key] = value
    }
}, go => {
    go.Context = {
        this: go
    }
    go.Events.on('context:provide', (key, value) => {
        go.setContext(key, value)
    })
    // works well with stateprovider
    go.Events.on('set:stateprovider', stateProvider => {
        go.Events.emit('context:provide','stateProvider', stateProvider)
    })
});

export interface IExpressionContainer{
    createVariable(value:any) : any
    Context : any
}