import { mixin } from 'quarkit-mixin'

import { IResource, IResourceBag } from '../resource'
import { IVariable } from '../expression'

export const DefaultCostList = 'default'

export class CostSlot{
    constructor(resource: IResource, amount:IVariable) {
        this.Resource = resource
        this.Amount = amount
    }
    Amount:IVariable;
    Resource:IResource
}

export const Cost = mixin('Cost', {
    //as Dictionnary
    get DefaultCost() : Array<CostSlot> {
        return this.getCostList(DefaultCostList)
    },

    getCostList(name:string) : Array<CostSlot> {
        if (!this._costs) {
            this._costs = {}
            this._costs[DefaultCostList] = new Array<CostSlot>()
        }

        if (!this._costs[name]) {
            this._costs[name] = new Array<CostSlot>()
        }

        return this._costs[name]
    },

    addCostSlot(resource:IResource, amount:any, list:string = DefaultCostList) : ICost {
        this.getCostList(list).push(new CostSlot(resource, this.createVariable(amount)));
        return this;
    }
}, null,
{
    dependencies:[
        'ExpressionContainer'
    ]
})

export interface ICost{
  DefaultCost : CostSlot[]

  getCostList(name:string) :  CostSlot[]

  addCostSlot(resource:IResource, amount:any, list?:string) : ICost
    
}
