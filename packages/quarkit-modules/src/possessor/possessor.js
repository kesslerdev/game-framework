import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { StateProviderMixin, StatefullMixin } from '../quarkit-modules'


export const PossessionActMixin = Mixin((superclass) => class extends superclass {


  static createPossessionAct(possession) {
    const i = new this()
    i.Possession = possession
    return i
  }

  Possession
})

export class PossessionAct extends mix().with(GameObjectMixin, PossessionActMixin) {}

export const PossessorMixin = Mixin((superclass) => class extends superclass {

  getRelated() {
    const related = super.getRelated()
    this.PossessionsObjects.map((go) => related.push(go))

    return related
  }

  static get PossessionActClass() {
    return this._possessionActClass || (this._possessionActClass = PossessionAct)
  }

  static set PossessionActClass(possessionActClass) {
    this._possessionActClass = possessionActClass
    return this._possessionActClass
  }

  get Possessions() {
    return this.possessions || (this.possessions = [])
  }

  get PossessionsObjects() {
    const possessions = this.Possessions
    if (!this.Cache.possessionObjects) {
      this.Cache.possessionObjects = possessions.map((possession) => {
        if (possession.Possession instanceof StatefullMixin && this instanceof StateProviderMixin) {
          return possession.Possession.withState(this, false)
        }
        return possession.Possession
      })
    }
    return this.Cache.possessionObjects
  }

  createPossessionAct(possession) {
    // TODO: cache invalidate not here (but at the push in this._possessions)
    delete this.Cache.possessionObjects
    return this.constructor.PossessionActClass.createPossessionAct(possession)
  }
})
