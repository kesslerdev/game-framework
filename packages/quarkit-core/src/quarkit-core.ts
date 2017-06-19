import { EventEmitter } from 'events'
import { IExtendable, Extendable, classAsMixin } from 'quarkit-mixin'

export class GameObject extends Extendable implements IGameObject{
    Slug:string;

    cache:object;

    constructor(slug:string) {
        super()
        this.Slug = slug
        this.initialize()
    }

    initialize() {
        this.cache = {}
    }

    Equals(obj:IGameObject) : boolean {
        return obj.Slug == this.Slug && this.constructor.name == obj.constructor.name
    }

    clearCache() : void{
        this.cache = {}
    }
}

// Inheritance not work on mixins ()
export const GameObjectMixin = classAsMixin(GameObject, {
    dependencies: ['Extendable'],// classAsMixin uses class name in this case Extendable
})

export interface IGameObject extends IExtendable{
    Slug:string;
    cache:object;
    Equals(obj:IGameObject) : boolean
    clearCache() : void
}