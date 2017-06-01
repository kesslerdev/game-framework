import { EventEmitter } from 'events'
import { IExtendable, Extendable } from 'quarkit-mixin'

export class GameObject extends Extendable implements IGameObject{
    Slug:string;

    constructor(slug:string){
        super()
        this.Slug = slug;
    }

    Equals(obj:IGameObject) : boolean {
        return obj.Slug == this.Slug && this.constructor.name == obj.constructor.name
    }
}

export interface IGameObject extends IExtendable{
    Slug:string;
    Equals(obj:IGameObject) : boolean
}