import { Mixin, mix } from 'quarkit-mixin'

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
    return this._resourceSlotClass = resourceSlotClass
  }
  // AsDictonnary
  get InnerBag() {
    return this.innerBag || (this.innerBag = [])
  }

  addResourceSlot(resource) {
    this.InnerBag.push(this.constructor.ResourceSlotClass.createResourceSlot(resource))
    return this
  }

  increaseResource(resource, amount) {
    for (const entry of this.InnerBag) {
      if (entry.Resource.equals(resource)) {
        entry.Amount += amount
        break
      }
    }
    return this
  }

})
