import { ResourceTemplate, ShopTemplate, Capitalist } from './templates'
import { IGameObject } from 'quarkit-core'
import { ResourceSlot, Production, IProduction } from 'quarkit-modules'
import { Colors } from './lib/Colors'

const moment = require('moment')

export class GameClient {
  private _player:Capitalist
  constructor (player:Capitalist) {
    this._player = player
  }

  buyShop(shop:ShopTemplate) {
    shop.purchaseFor(this._player)
    console.log(`Player ${Colors.slug(this._player.Slug)} buy Shop ${Colors.slug(shop.Slug)}`)
  }

  getInnerBag() : ResourceSlot[] {
    this._player.PossessionsObjects.map((go:any) => {
      if (go instanceof Production) {
        go.applyProduction(this._player)
      }
    })
    return this._player.InnerBag
  }

  printPlayer() {
    console.log(Colors.lite("=============================="))
    const resBag = this.getInnerBag().map(e => `${e.Resource.Slug} = ${e.Amount}`).join(', ')
    console.log(`Player ${Colors.slug(this._player.Slug)} (${resBag})`)
    this._player.PossessionsObjects.map(this.printAct)
    console.log(Colors.lite("=============================="))
  }

  printAct(go:IProduction&IGameObject) {
    console.log(`  Shop ${Colors.slug(go.Slug)} (lastprod ${printSpan(go.LastProductionTime)})`)
  }
}


function printSpan(d) {
  return moment(d).fromNow()
}
