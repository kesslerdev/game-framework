
import { GameObject } from 'quarkit-core'
import { classAsMixin } from 'quarkit-mixin'

export { IStateful, Stateful } from './Stateful'
export { IStateProvider, StateProvider } from './StateProvider'

export class StateGameObject extends GameObject{
    get StateKey() : string {
        return this.constructor.name + '#' + this.Slug
    }
}

export const StateGameObjectMixin = classAsMixin(StateGameObject, {
  dependencies: ['GameObject'],// classAsMixin uses class name in this case GameObject
})
