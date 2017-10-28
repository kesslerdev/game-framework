import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'


export const PossessionActMixin = Mixin((superclass) => class extends superclass {


  static createPossessionAct(possession) {
    const i = new this()
    i.Possession = possession
    return i
  }

  Possession
})

export class PossessionAct extends mix().with(GameObjectMixin, PossessionActMixin) {}
