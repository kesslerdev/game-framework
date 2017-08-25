import { Mixin } from 'quarkit-mixin'

export const ResourceMixin = Mixin((superclass) => class extends superclass {
  get Premium() {
    return this.premium || (this.premium = false)
  }
  
  set Premium(value) {
    this.premium = value
  }

})
