import { mixin } from 'quarkit-mixin'
import { IGameObject } from 'quarkit-core'

export const Resource = mixin('Resource', {
  get Premium() {
    return this.isPremium || (this.isPremium = false)
  },
  set Premium(value:boolean) {
    this.isPremium = value
  },
})

export interface IResource extends IGameObject{
  Premium:boolean
}
