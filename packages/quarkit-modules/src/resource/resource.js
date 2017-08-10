import { Mixin } from 'quarkit-mixin'

export const ResourceMixin = Mixin((superclass) => class extends superclass {
  get Premium() {
    return this.isPremium || (this.isPremium = false)
  }
  
  set Premium(value) {
    this.isPremium = value
  }

})
