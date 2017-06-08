import { EventEmitter } from 'events'
import { IExtendable, Extendable } from 'quarkit-mixin'

export class GameObject extends Extendable implements IGameObject{
    Slug:string;

    cache:object;

    constructor(slug:string){
        super()
        this.Slug = slug
        this.cache = {}
    }

    Equals(obj:IGameObject) : boolean {
        return obj.Slug == this.Slug && this.constructor.name == obj.constructor.name
    }

    clearCache() : void{
        this.cache = {}
    }
}

export interface IGameObject extends IExtendable{
    Slug:string;
    cache:object;
    Equals(obj:IGameObject) : boolean
    clearCache() : void
}