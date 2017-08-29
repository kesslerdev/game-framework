import { GameObjectMixin } from 'quarkit-core'
import { mix } from 'quarkit-mixin'
import {
  StateGameObjectMixin,
  ResourceMixin,
  ResourceBagMixin,
  ProductionMixin,
  PurchasableMixin,
  StateProviderMixin,
  PossessorMixin
} from 'quarkit-modules'

import { RegistrableMixin } from 'quarkit-redux'

export class ResourceTemplate extends mix().with(GameObjectMixin, ResourceMixin, RegistrableMixin) { }

export class ShopTemplate extends mix().with(StateGameObjectMixin, ProductionMixin, PurchasableMixin, RegistrableMixin) { }

export class Capitalist extends mix().with(GameObjectMixin, StateProviderMixin, ResourceBagMixin, PossessorMixin) { }

