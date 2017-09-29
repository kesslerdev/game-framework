import { GameObjectMixin } from 'quarkit-core'
import { mix } from 'quarkit-mixin'
import {
  StateGameObjectMixin,
  StateProviderMixin,
} from 'quarkit-modules'

import { ResourceReduxMixin, ResourceBagReduxMixin,
  ProductionReduxMixin,
  PossessorReduxMixin, PurchasableReduxMixin } from 'quarkit-redux'

export class ResourceTemplate extends mix().with(GameObjectMixin, ResourceReduxMixin) { }

export class ShopTemplate extends mix().with(StateGameObjectMixin, ProductionReduxMixin, PurchasableReduxMixin) { }

export class Capitalist extends mix().with(GameObjectMixin, StateProviderMixin, ResourceBagReduxMixin, PossessorReduxMixin) { }
