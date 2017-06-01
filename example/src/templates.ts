// Imports
import { IGameObject, GameObject } from 'quarkit-core'

import { 
    IProduction, Production,
    Resource, IResource, ResourceBag, IResourceBag,
    IStateful, Stateful, IStateProvider, StateProvider, StateGameObject
} from 'quarkit-modules'

import { IExtendable } from 'quarkit-mixin';


// Type declaration
@Resource
class ResourceTemplate extends GameObject{
}

@Production
@Stateful 
class ShopTemplate extends StateGameObject{
}

@ResourceBag
@StateProvider
class Capitalist extends GameObject{
    
}

// FIX
// little Fix show => https://github.com/Microsoft/TypeScript/issues/4881#issuecomment-187903272
interface ResourceTemplate extends IResource {}
interface ShopTemplate extends IStateful, IProduction {}
interface Capitalist extends IStateProvider, IResourceBag {}


// Export GameObjects (Each can be a collection)
export { ResourceTemplate, ShopTemplate, Capitalist } ;
