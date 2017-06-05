import { mixin } from 'quarkit-mixin';
import { VariableCreator, ExpressionVariable, IVariable } from './Variable';


export const ExpressionContainer = mixin('ExpressionContainer', {
    createVariable(value:string) : IVariable {
        let variable = VariableCreator(value)
        if (variable instanceof ExpressionVariable) {
            variable.setContext(this.Context)
        }
        return variable
    }
}, go => {
    go.Context = {
        this: go
    }
    go.Events.on('context:provide', (key, value) => {
        go.Context[key] = value
    })
    // works well with stateprovider
    go.Events.on('stateprovider:set', stateProvider => {
        go.Events.emit('context:provide','stateProvider', stateProvider)
    })
});

export interface IExpressionContainer{
    createVariable(value:any) : any
    Context : any
}