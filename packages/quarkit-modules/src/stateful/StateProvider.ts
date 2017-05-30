import { mixin } from 'quarkit-mixin'
import { IStateful } from './Stateful'

export const StateProvider = mixin('StateProvider', {
  getState(key:string) : any {
    if (!this.internalStates) this.internalStates = {}

    return this.internalStates[key] || (this.internalStates[key] = {})
  },
})

export interface IStateProvider{
  getState(key:string) : any
}
