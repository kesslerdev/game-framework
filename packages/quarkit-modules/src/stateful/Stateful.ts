import { mixin, clone } from 'quarkit-mixin'
import { IStateProvider } from './StateProvider'
import { EventEmitter } from 'events'

export const Stateful = mixin('Stateful', {
  get State() : any {
    if (!this.__state) {
      throw new Error('unable to use an Uninitialized State please call withState() before')
    }

    return this.__state
  },

  withState(stateProvider : IStateProvider, cloneNew:boolean = true) {
    // tslint:disable-next-line:no-var-self
    let newThis = this

    if (cloneNew) {
      newThis = clone(this, true)
      newThis.clearCache()
      // Reinit
      // TODO: do better implementation for decoupling from other
      newThis.Events = new EventEmitter()

      if (Reflect.has(newThis, 'registerEvents')) {
        newThis.registerEvents(newThis.Events)
      }

      newThis.Constructors.map((fn) => {
        fn(newThis)
      })

      newThis.Events.emit('constructors:after')
    }
        
    newThis.__state = stateProvider.getState(this.stateKeyAccessor())
    newThis.Events.emit('set:stateprovider', stateProvider, newThis.__state)
    return newThis
  },

  stateKeyAccessor() : string {
    if (!this.StateKey) throw new Error('please redefine get StateKey() in your stateful')
    return this.StateKey
  },
})

export interface IStateful{
  State : any
  withState(stateProvider : IStateProvider) : this
}
