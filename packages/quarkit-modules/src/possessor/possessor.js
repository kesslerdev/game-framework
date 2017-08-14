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

  static get PossessionActClass() {
    return this._possessionActClass || (this._possessionActClass = PossessionAct)
  }

  static set PossessionActClass(possessionActClass) {
    return this._possessionActClass = possessionActClass
  }
  get Possessions(){
    return this._possessions || (this._possessions = [])
  }

  get PossessionsObjects(){
    const possessions = this.Possessions
    if (!this.Cache.possessionObjects) {
      this.Cache.possessionObjects = possessions.map((possession) => {
        if (this instanceof StateProviderMixin && possession.Possession instanceof StatefullMixin) {
          return possession.Possession.withState(this,false)
        }
        return possession.Possession
      })
    }
    return this.Cache.possessionObjects
  }

  createPossessionAct(possession) {
    //TODO: cache invalidate not here (but at the push in this._possessions)
    delete this.Cache.possessionObjects
    return new this.constructor.PossessionActClass.createPossessionAct(possession)
  }
})
