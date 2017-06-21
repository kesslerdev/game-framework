import { classAsMixin } from './class-mixin'
import { EventEmitter } from 'events'

export class Extendable implements IExtendable{
  [x: string]: any;


  constructor() {
    this.initializeExtendable()
  }
  initializeExtendable() {

    this.registerEvents(this.Events)

    this.Constructors.map((fn) => {
      fn(this)
    })

    this.Events.emit('constructors:after')
  }
  
  get Events():EventEmitter {
    return this._events || (this._events = new EventEmitter())
  }

  get Extensions() : string[] {
    return this.__mixins || (this.__mixins = new Array<string>())
  }

  get Constructors() : Function[] {
    return this.__constructors || (this.__constructors = new Array<Function>())
  }

  registerEvents(event:EventEmitter) {}
}

export const ExtendableMixin = classAsMixin(Extendable)

export interface IExtendable{
  readonly Extensions : string[]
  readonly Constructors : Function[]
  Events:EventEmitter
}
