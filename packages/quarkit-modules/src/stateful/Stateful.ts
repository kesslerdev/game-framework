import { mixin, clone } from 'quarkit-mixin';
import { IStateProvider } from './StateProvider';

export const Stateful = mixin('Stateful', {
    get State() : any {
        if (!this.__state) {
            throw new Error('unable to use an Uninitialized State please call withState() before');
        }

        return this.__state;
    },

    withState(stateProvider : IStateProvider) {
        let newThis = clone(this, true)
        newThis.__state = stateProvider.getState(this.StateKey);
        this.Events.emit('stateprovider:set', stateProvider)
        return newThis;
    },

    get StateKey() : string {
        throw new Error('please redefine get StateKey() in your stateful');
    }
});

export interface IStateful{
    State : any
    withState(stateProvider : IStateProvider) : this
}