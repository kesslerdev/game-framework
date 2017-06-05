import { mixin } from 'quarkit-mixin'
import { IResource } from './Resource'

export class ResourceSlot{
  constructor(resource: IResource) {
    this.Resource = resource
  }
  Amount = 0
  Resource:IResource
}

export const ResourceBag = mixin('ResourceBag', {
  // AsDictonnary
  get InnerBag() : ResourceSlot[] {
    return this._inner_bag || (this._inner_bag = [])
  },
  addResourceSlot(resource:IResource) : IResourceBag {
    this.InnerBag.push(new ResourceSlot(resource))
    return this
  },
  increaseResource(resource:IResource, amount:number) {
    for (const entry of this.InnerBag) {
      if (entry.Resource.Equals(resource)) {
        entry.Amount += amount
        break
      }
    }
    return this
  },
})

export interface IResourceBag{
  InnerBag : ResourceSlot[]
  addResourceSlot(resource:IResource) : IResourceBag
  increaseResource(resource:IResource, amount:number) : IResourceBag
}
