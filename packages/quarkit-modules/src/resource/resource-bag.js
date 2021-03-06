import { Mixin, mix } from 'quarkit-mixin'
import { ResourceMixin } from './resource'

export const ResourceSlotMixin = Mixin((superclass) => class extends superclass {

  static createResourceSlot(resource) {
    const i = new this()
    i.Resource = resource
    return i
  }

  Amount = 0
  Resource
})

export class ResourceSlot extends mix().with(ResourceSlotMixin) {}

export const ResourceBagMixin = Mixin((superclass) => class extends superclass {

  static get ResourceSlotClass() {
    return this._resourceSlotClass || (this._resourceSlotClass = ResourceSlot)
  }

  static set ResourceSlotClass(resourceSlotClass) {
    this._resourceSlotClass = resourceSlotClass
    return this._resourceSlotClass
  }
  // AsDictonnary
  get InnerBag() {
    return this.innerBag || (this.innerBag = [])
  }

  addResourceSlot(resource) {
    if (!(resource instanceof ResourceMixin)) {
      throw new Error('addResourceSlot must be used with ResourceMixin')
    }
    this.InnerBag.push(this.constructor.ResourceSlotClass.createResourceSlot(resource))
    return this
  }

  getResourceSlot(resource) {
    if (!(resource instanceof ResourceMixin)) {
      throw new Error('increaseResource must be used with ResourceMixin')
    }

    for (const entry of this.InnerBag) {
      if (entry.Resource.equals(resource)) {
        return entry
      }
    }

    return null
  }

  incraseResource(resource, amount) {
    if (!(resource instanceof ResourceMixin)) {
      throw new Error('increaseResource must be used with ResourceMixin')
    }
    const slot = this.getResourceSlot(resource)
    slot.Amount += amount
    // console.log(`+ ${amount} ${slot.Resource.slug}`)

    return this
  }

  decraseResource(resource, amount) {
    if (!(resource instanceof ResourceMixin)) {
      throw new Error('increaseResource must be used with ResourceMixin')
    }
    const slot = this.getResourceSlot(resource)
    slot.Amount -= amount

    return slot.Amount
  }

})
