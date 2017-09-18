import { GameObjectMixin } from 'quarkit-core'
import { mix } from 'quarkit-mixin'
import {
  StateGameObjectMixin,
  ProductionMixin,
  StateProviderMixin,
} from 'quarkit-modules'

import { ResourceReduxMixin, ResourceBagReduxMixin,
   PossessorReduxMixin, PurchasableReduxMixin } from 'quarkit-redux'

export class ResourceTemplate extends mix().with(GameObjectMixin, ResourceReduxMixin) { }

export class ShopTemplate extends mix().with(StateGameObjectMixin, ProductionMixin, PurchasableReduxMixin) { }

export class Capitalist extends mix().with(GameObjectMixin, StateProviderMixin, ResourceBagReduxMixin, PossessorReduxMixin) { }

