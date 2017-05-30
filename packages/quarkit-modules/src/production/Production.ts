import { mixin } from 'quarkit-mixin';

import { IResource, IResourceBag } from '../resource';

export class ProductionSlot{
    constructor(resource: IResource, amount:number) {
        this.Resource = resource;
        this.Amount = amount;
    }
    Amount = 0;
    Resource:IResource;
}
export const Production = mixin('Production', {
    get ProductionBaseTime() : number {
        return this._production_base_time || (this._production_base_time = 100);
    },
    set ProductionBaseTime(time:number) {
        this._production_base_time = time;
    },
    get LastProductionTime() : number {
        return this.State._last_production_time || (this.State._last_production_time = Date.now());
    },
    //as Dictionnary
    get ProductionSlots() : Array<ProductionSlot> {
        return this._production_slots || (this._production_slots = new Array<ProductionSlot>())
    },
    addProductionSlot(resource:IResource, amount:number) : IProduction {
        this.ProductionSlots.push(new ProductionSlot(resource, amount));
        return this;
    },
    applyProduction(resourceBag:IResourceBag) : IProduction {
        let prod  = 1
        let productionIterations = Math.trunc((Date.now() - this.LastProductionTime ) / this.ProductionBaseTime)

        if (productionIterations) {
            this.State._last_production_time = Date.now();
            let production = this.ProductionSlots;
            for (let key in production) {
                resourceBag.increaseResource(production[key].Resource, productionIterations * production[key].Amount);
            }
        }
        return this;        
    }
},{
    dependencies:[
        'Stateful'
    ]
});

export interface IProduction{
    ProductionSlots : Array<ProductionSlot>
    ProductionBaseTime : number
    //States
    LastProductionTime : number

    addProductionSlot(resource:IResource, amount:number) : IProduction

    applyProduction(resourceBag:IResourceBag) : IProduction
    
}