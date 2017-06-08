import { mixin } from 'quarkit-mixin'
import { VariableCreator, ExpressionVariable, IVariable } from './Variable'


export const ExpressionContainer = mixin('ExpressionContainer', {
    createVariable(value:string) : IVariable {
        let variable = VariableCreator(value)
        if (variable instanceof ExpressionVariable) {
            // TODO: in this case newly added var context not added in var context use a function accessor
            variable.setContextAccessor(() => {
                console.log('access to context ' + this.constructor.name)
                console.log(Reflect.ownKeys(this.Context))
                return this.Context
            })
        }
        return variable
    },
    setContext(key,value) {
        console.log(`providecontext ${key}`)
        this.Context[key] = value
        console.log(Reflect.ownKeys(this.Context))
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