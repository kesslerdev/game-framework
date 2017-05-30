import { mixin } from 'quarkit-mixin';

export const Resource = mixin('Resource', {
    get Premium() {
        return this._is_premium || (this._is_premium = false);
    },
    set Premium(value:boolean){
        this._is_premium = value;
    }
});

export interface IResource{
    Premium:boolean
}