import { mixin } from 'quarkit-mixin';
import { IStateful } from './Stateful';

export const StateProvider = mixin('StateProvider', {
    getState(key:string) : any {
         if(!this._internal_states) this._internal_states = {};

        return this._internal_states[key] || (this._internal_states[key] = {});
    }
});

export interface IStateProvider{
    getState(key:string) : any
}