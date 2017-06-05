import { mixin } from 'quarkit-mixin'
import { IGameObject } from 'quarkit-core'

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
  createPossessionAct(possession:IGameObject) : PossessionAct {
    return new PossessionAct(possession)
  },
})

export interface IPossessor{
  Possessions:PossessionAct[]

  createPossessionAct(possession:IGameObject) : PossessionAct
}
