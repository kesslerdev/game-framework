import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { StatefullMixin } from '../stateful'
import { ResourceMixin, ResourceBagMixin } from '../resource'
import { ExpressionContainerMixin } from '../expression'
import { ProductionSlot } from './ProductionSlotMixin'

export const ProductionMixin = Mixin((superclass) =>
  class extends mix(superclass).with(GameObjectMixin, StatefullMixin, ExpressionContainerMixin) {

    constructor(...args) {
      super(...args)
      this.Events.on(
        'set:stateprovider',
        (stateProvider) => this.LastProductionTime,
    )

      this.createExpression('ProductionBaseTime', 100)

      this.createStateProperty('LastProductionTime', () => Date.now())
    }

    static get ProductionSlotClass() {
      return this._productionSlotClass || (this._productionSlotClass = ProductionSlot)
    }

    static set ProductionSlotClass(productionSlotClass) {
      this._productionSlotClass = productionSlotClass
    }

    setProductionBaseTime(time) {
      this.ProductionBaseTime = time
      return this
    }
    // as Dictionnary
    get ProductionSlots() {
      return this.productionSlots || (this.productionSlots = [])
    }

    addProductionSlot(resource, amount) {
      if (!(resource instanceof ResourceMixin)) {
        throw new Error('addProductionSlot must be used with ResourceMixin')
      }
      const amountVar = this.createVariable(amount,
        (oldValue, newValue) => {
          this.Events.emit('productionSlot:expressionProperty:update', resource, oldValue, newValue)
        })
      const prodSlot = this.constructor
        .ProductionSlotClass.createProductionSlot(resource, amountVar)

      this.ProductionSlots.push(prodSlot)

      return this
    }

    loopRelated(go) {
      super.loopRelated(go)
    // apply production to related resourceBags
      if (go instanceof ResourceBagMixin) {
        this.applyProduction(go)
      }
    }

    applyProduction(resourceBag) {
      if (!(resourceBag instanceof ResourceBagMixin)) {
        throw new Error('applyProduction must be used with ResourceBagMixin')
      }

      const productionIterations =
      Math.trunc((Date.now() - this.LastProductionTime) / this.ProductionBaseTime)
      if (productionIterations) {
        this.LastProductionTime = Date.now()

        this.ProductionSlots.forEach((prodSlot) => {
          resourceBag.incraseResource(
          prodSlot.Resource,
          productionIterations * prodSlot.Amount,
        )
        })

        this.Events.emit(
        'production',
        productionIterations,
        this.LastProductionTime,
        this.LastProductionTime + this.ProductionBaseTime
      )
      }
      return this
    }

})
