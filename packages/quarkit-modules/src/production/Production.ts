import { mixin } from 'quarkit-mixin'

import { IResource, IResourceBag } from '../resource'
import { IVariable } from '../expression'

export class ProductionSlot{
  private _amount:any
  constructor(resource: IResource, amount:any) {
    this.Resource = resource
    this._amount = amount
  }

  get Amount() : IVariable {
    if (typeof this._amount === 'object' && this._amount.getValue) {
      return this._amount.getValue()
    }

    return this._amount
  }

  Resource:IResource
}

export const Production = mixin('Production', {
  get ProductionBaseTime() : number {
    return this._production_base_time.getValue() || (this._production_base_time = this.createVariable(100))
  },
  set ProductionBaseTime(time:number) {
    this._production_base_time = this.createVariable(time)
  },
  setProductionBaseTime(time:any) {
    this._production_base_time = this.createVariable(time)
    return this
  },

  get LastProductionTime() : number {
    return this.State._last_production_time || (this.State._last_production_time = Date.now())
  },
  // as Dictionnary
  get ProductionSlots() : Array<ProductionSlot> {
    return this._production_slots || (this._production_slots = new Array<ProductionSlot>())
  },
  addProductionSlot(resource:IResource, amount:any) : IProduction {
    this.ProductionSlots.push(new ProductionSlot(resource, this.createVariable(amount)))
    return this
  },
  applyProduction(resourceBag:IResourceBag) : IProduction {
    const prod  = 1
    let productionIterations = Math.trunc((Date.now() - this.LastProductionTime ) / this.ProductionBaseTime)

    if (productionIterations) {
      this.State._last_production_time = Date.now()
      const production = this.ProductionSlots
      for (let key in production) {
        resourceBag.increaseResource(production[key].Resource, productionIterations * production[key].Amount)
      }
    }
    return this      
  },
},
go => {
    go.Events.on('stateprovider:set', stateProvider => {
        go.LastProductionTime
    })
},
{
    dependencies:[
        'Stateful',
        'ExpressionContainer'
    ]
})

export interface IProduction{
    ProductionSlots : Array<ProductionSlot>
    ProductionBaseTime : number
    //States
    LastProductionTime : number

    setProductionBaseTime(time:any) : IProduction
    addProductionSlot(resource:IResource, amount:any) : IProduction

    applyProduction(resourceBag:IResourceBag) : IProduction
    
}