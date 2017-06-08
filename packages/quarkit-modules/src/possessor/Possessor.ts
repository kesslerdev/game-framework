import { mixin } from 'quarkit-mixin'
import { IGameObject } from 'quarkit-core'
import { StateProvider, Stateful } from '../quarkit-modules'

export class PossessionAct {

  constructor(possession:IGameObject) {
    this.Possession = possession
  }

  Possession:IGameObject
}

export const Possessor = mixin('Possessor', {
  get Possessions() : PossessionAct[] {
    return this._possessions || (this._possessions = [])
  },

  get PossessionsObjects() : IGameObject[]|any[] {
    const possessions = this.Possessions
    if (!this.cache.possessionObjects) {
      this.cache.possessionObjects = possessions.map((possession:any) => {
        if (this instanceof StateProvider && possession.Possession instanceof Stateful) {
          return possession.Possession.withState(this,false)
        }
        return possession.Possession
      })
    }
    return this.cache.possessionObjects
  },

  createPossessionAct(possession:IGameObject) : PossessionAct {
    //TODO: cache invalidate not here (but at the push in this._possessions)
    delete this.cache.possessionObjects
    return new PossessionAct(possession)
  },
})

export interface IPossessor{
  Possessions:PossessionAct[]
  PossessionsObjects:IGameObject[]

  createPossessionAct(possession:IGameObject) : PossessionAct
}
