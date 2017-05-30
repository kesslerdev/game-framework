
export class GameObject{
    Slug:string;

    constructor(slug:string){
        this.Slug = slug;
    }

    Equals(obj:IGameObject) : boolean {
        return obj.Slug == this.Slug && this.constructor.name == obj.constructor.name
    }
}

export interface IGameObject{
    Slug:string;
    Equals(obj:IGameObject) : boolean
}