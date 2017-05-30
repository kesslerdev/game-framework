import { mixin } from 'quarkit-mixin'
import { VariableCreator, ExpressionVariable, IVariable } from './Variable'


export const ExpressionContainer = mixin('ExpressionContainer', {
    createVariable(value:string) : IVariable {
        const variable = VariableCreator(value)
        if (variable instanceof ExpressionVariable) {
            variable.setContextAccessor(() => {
                return this.__context
            })
        }
        return variable
    },
    setContext(key,value) {
        this.__context[key] = value
    },

    get Context() {
        return this.__context
    }
}, go => {
    go.__context = {
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