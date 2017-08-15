import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { StatefullMixin } from '../stateful'
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
    this.ProductionSlots.push(this.constructor.ProductionSlotClass.createProductionSlot(resource, this.createVariable(amount)))
    return this
  }

  applyProduction(resourceBag) {
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
