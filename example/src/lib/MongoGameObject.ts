import { Document } from 'camo'
import { GameObjectMixin } from 'quarkit-core'
import { ExtendableMixin } from 'quarkit-mixin'

// Types
@GameObjectMixin
@ExtendableMixin
export class MongoGameObject extends Document{
  [x: string]: any
  constructor() {
    super()
    this.Slug = String
    this.initializeExtendable()
  }
}
