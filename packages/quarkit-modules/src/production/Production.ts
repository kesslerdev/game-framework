import { mixin } from 'quarkit-mixin'

import { IResource, IResourceBag } from '../resource'
import { IVariable } from '../expression'

export class ProductionSlot{
  private _amount:any
  constructor(resource: IResource, amount:any) {
    this.Resource = resource
    this._amount = amount
  }

  get Amount() : any {
    if (typeof this._amount === 'object' && this._amount.getValue) {
      return this._amount.getValue()
    }

    return this._amount
  }

  Resource:IResource
}

export const Production = mixin(
  'Production', 
  {
    get ProductionBaseTime() : number {
      return this.productionBaseTime.getValue() 
        || (this.productionBaseTime = this.createVariable(100))
    },
    set ProductionBaseTime(time:number) {
      this.productionBaseTime = this.createVariable(time)
    },
    setProductionBaseTime(time:any) {
      this.productionBaseTime = this.createVariable(time)
      return this
    },

    get LastProductionTime() : number {
      return this.State.lastProductionTime || (this.State.lastProductionTime = Date.now())
    },
    // as Dictionnary
    get ProductionSlots() : ProductionSlot[] {
      return this.productionSlots || (this.productionSlots = [])
    },
    addProductionSlot(resource:IResource, amount:any) : IProduction {
      this.ProductionSlots.push(new ProductionSlot(resource, this.createVariable(amount)))
      return this
    },
    applyProduction(resourceBag:IResourceBag) : IProduction {
      const prod  = 1
      const productionIterations = 
        Math.trunc((Date.now() - this.LastProductionTime) / this.ProductionBaseTime)

      if (productionIterations) {
        this.State.lastProductionTime = Date.now()
        const production = this.ProductionSlots
        for (const key in production) {
          resourceBag.increaseResource(
            production[key].Resource,
            productionIterations * production[key].Amount,
          )
        }
      }
      return this      
    },
  },
  (go) => {
    go.Events.on(
      'set:stateprovider', 
      stateProvider => go.LastProductionTime,
    )
  },                            
  {
    dependencies:[
      'Stateful',
      'ExpressionContainer',
    ],
  })

export interface IProduction{
  ProductionSlots : ProductionSlot[]
  ProductionBaseTime : number
    // States
  LastProductionTime : number

  setProductionBaseTime(time:any) : IProduction
  addProductionSlot(resource:IResource, amount:any) : IProduction
  
  applyProduction(resourceBag:IResourceBag) : IProduction  
}
