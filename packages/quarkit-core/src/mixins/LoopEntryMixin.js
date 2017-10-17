import { Mixin } from 'quarkit-mixin'

export const LoopEntryMixin = Mixin((superclass) => class extends superclass {
  loop() {
    this.getRelated().map((goRelated) => {
      if (goRelated instanceof LoopEntryMixin) { return goRelated.loopRelated(this) }
      return false
    })
  }

  loopRelated(go) {
    return false
  }

  getRelated() {
    return []
  }
})

export default LoopEntryMixin