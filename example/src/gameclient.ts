import { ResourceTemplate, ShopTemplate, Capitalist } from './templates'

export class GameClient {
  private _player:Capitalist
  constructor (player:Capitalist) {
    this._player = player
  }

  buyShop(shop:ShopTemplate){
    shop.purchaseFor(this._player)
    console.log(`Player ${this._player.Slug} buy Shop ${shop.Slug}`)
  }
}