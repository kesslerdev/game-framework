import { GameObjectMixin } from 'quarkit-core'
import { mix } from 'quarkit-mixin'
import {
  StateGameObjectMixin,
  StateProviderMixin,
  NamedContextVar,
} from 'quarkit-modules'

import { ResourceReduxMixin, ResourceBagReduxMixin,
  ProductionReduxMixin,
  LevelReduxMixin,
  PossessorReduxMixin, PurchasableReduxMixin } from 'quarkit-redux'

export class ResourceTemplate 
extends mix().with(
  GameObjectMixin, 
  ResourceReduxMixin
) { }

export class ShopTemplate 
extends mix().with(
  StateGameObjectMixin, 
  ProductionReduxMixin, 
  LevelReduxMixin, 
  PurchasableReduxMixin
) { }

export class Capitalist 
extends mix().with(
  GameObjectMixin, 
  StateProviderMixin, 
  ResourceBagReduxMixin, 
  PossessorReduxMixin,
  NamedContextVar('Capitalist')
) { }
