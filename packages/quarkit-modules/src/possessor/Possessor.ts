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
    return possessions.map((possession:any) => {
      
      if (this instanceof StateProvider && possession.Possession instanceof Stateful) {
        return possession.Possession.withState(this)
      }
      return possession.Possession
    })
  },

  createPossessionAct(possession:IGameObject) : PossessionAct {
    return new PossessionAct(possession)
  },
})

export interface IPossessor{
  Possessions:PossessionAct[]
  PossessionsObjects:IGameObject[]

  createPossessionAct(possession:IGameObject) : PossessionAct
}
