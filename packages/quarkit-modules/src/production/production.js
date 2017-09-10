import { Mixin, mix, isApplicationOf } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { StatefullMixin } from '../stateful'
import { ResourceMixin, ResourceBagMixin } from '../resource'
import { ExpressionContainerMixin } from '../expression'


export const ProductionSlotMixin = Mixin((superclass) => class extends superclass {

  static createProductionSlot(resource, amount) {
    const i = new this()
    i.Resource = resource
    i._amount = amount
    return i
  }

  get Amount() {
    if (typeof this._amount === 'object' && this._amount.getValue) {
      return this._amount.getValue()
    }

    return this._amount
  }

  _amount
  Resource
})

export class ProductionSlot extends mix().with(ProductionSlotMixin) {}


export const ProductionMixin = Mixin((superclass) => class extends mix(superclass).with(GameObjectMixin,StatefullMixin,ExpressionContainerMixin) {

  constructor(...args) {
    super(...args)
    this.Events.on(
      'set:stateprovider', 
      stateProvider => this.LastProductionTime,
    )
  }

  static get ProductionSlotClass() {
    return this._productionSlotClass || (this._productionSlotClass = ProductionSlot)
  }

  static set ProductionSlotClass(productionSlotClass) {
    return this._productionSlotClass = productionSlotClass
  }

  get ProductionBaseTime() {
    return this.productionBaseTime.getValue() 
      || (this.productionBaseTime = this.createVariable(100))
  }

  set ProductionBaseTime(time) {
    this.productionBaseTime = this.createVariable(time)
  }

  setProductionBaseTime(time) {
    this.productionBaseTime = this.createVariable(time)
    return this
  }

  get LastProductionTime() {
    return this.State.lastProductionTime || (this.State.lastProductionTime = Date.now())
  }
    // as Dictionnary
  get ProductionSlots() {
    return this.productionSlots || (this.productionSlots = [])
  }

  addProductionSlot(resource, amount) {
    if(!(resource instanceof ResourceMixin)) {
      throw new Error('addProductionSlot must be used with ResourceMixin')
    }
    this.ProductionSlots.push(this.constructor.ProductionSlotClass.createProductionSlot(resource, this.createVariable(amount)))
    return this
  }

  loopRelated(go) {
    super.loopRelated(go)
    //apply production to related resourceBags 
    if(go instanceof ResourceBagMixin) {
      this.applyProduction(go)
    }
  }

  applyProduction(resourceBag) {
    if(!(resourceBag instanceof ResourceBagMixin)) {
      throw new Error('applyProduction must be used with ResourceBagMixin')
    }
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
  }

})
