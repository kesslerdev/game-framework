
import { GameObject } from 'quarkit-core'

export { IStateful, Stateful } from './Stateful';
export { IStateProvider, StateProvider } from './StateProvider'

export class StateGameObject extends GameObject{
    get StateKey() : string {
        return this.constructor.name + '.' + this.Slug
    }
}