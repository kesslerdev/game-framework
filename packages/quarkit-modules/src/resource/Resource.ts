import { mixin } from 'quarkit-mixin'
import { IGameObject } from 'quarkit-core'

export const Resource = mixin('Resource', {
  get Premium() {
    return this._is_premium || (this._is_premium = false)
  },
  set Premium(value:boolean) {
    this._is_premium = value
  },
})

export interface IResource extends IGameObject{
  Premium:boolean
}
