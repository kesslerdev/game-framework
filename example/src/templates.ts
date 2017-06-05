// Imports
import { IGameObject, GameObject } from 'quarkit-core'

import { 
    IProduction, Production,
    Resource, IResource, ResourceBag, IResourceBag,
    IStateful, Stateful, IStateProvider, StateProvider, StateGameObject,
    IExpressionContainer, ExpressionContainer,
    ICost, Cost,
} from 'quarkit-modules'

import { IExtendable } from 'quarkit-mixin'


// Type declaration
@Resource
class ResourceTemplate extends GameObject{
}

// First declare Feature mixin
@Production @Cost
// Then declare behaviors mixins 
@Stateful @ExpressionContainer
class ShopTemplate extends StateGameObject{
}

@ResourceBag
@StateProvider
class Capitalist extends GameObject{
    
}

// FIX
// little Fix show => https://github.com/Microsoft/TypeScript/issues/4881#issuecomment-187903272
interface ResourceTemplate extends IResource {}
interface ShopTemplate extends IStateful, IProduction, IExpressionContainer, ICost {}
interface Capitalist extends IStateProvider, IResourceBag {}


// Export GameObjects (Each can be a collection)
export { ResourceTemplate, ShopTemplate, Capitalist }
