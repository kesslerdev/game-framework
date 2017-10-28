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
