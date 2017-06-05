# Quarkit Game Framework Modules(QGF Modules)

the goal of this project is handle game features


## Install

Install with [npm](https://www.npmjs.com/)

```sh
npm i quarkit-modules --save
```

## TODO

- [ ] module create price module
- [ ] module create buyable module(use price to add the proprietary)
- [ ] module create upgradable module (level)


Api wanted
```ts

@ClassMixin({}) // options
@Depends('Stateful') // add dependency
@Depends('ExpressionContainer') // add dependency
export class Production extends Object implements IExpressionContainer{

  constructor(go) {
    go.Events.on('stateprovider:set', stateProvider => go.LastProductionTime)
  }

  get ProductionBaseTime() : number {
    return this._production_base_time.getValue() || (this._production_base_time = this.createVariable(100))
  }

  set ProductionBaseTime(time:number) {
    this._production_base_time = this.createVariable(time)
  }

  setProductionBaseTime(time:any) {
    this._production_base_time = this.createVariable(time)
    return this
  }

  get LastProductionTime() : number {
    return this.State._last_production_time || (this.State._last_production_time = Date.now())
  }

  // as Dictionnary
  get ProductionSlots() : Array<ProductionSlot> {
    return this._production_slots || (this._production_slots = new Array<ProductionSlot>())
  }

  addProductionSlot(resource:IResource, amount:any) : IProduction {
    this.ProductionSlots.push(new ProductionSlot(resource, this.createVariable(amount)))
    return this
  }


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
  }
}
```