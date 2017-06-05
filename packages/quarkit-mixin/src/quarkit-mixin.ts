import { EventEmitter } from 'events'

declare global {
  interface Function{
    curry() : Function
  }
}

Function.prototype.curry = function () : any {
  const fn = this
  const args = [].slice.call(arguments, 0)
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments, 0)))
  }
}

export * from './mixin'
export * from './clone'

export class Extendable implements IExtendable{

  Events:EventEmitter

  constructor(){

    this.Events = new EventEmitter(); 
    this.Constructors.map(fn => {
      fn(this)
    })
    this.Events.emit('constructors:after')
  }

  Extensions:string[]
  Constructors:Function[]
}
export interface IExtendable{
  Extensions : string[]
  Constructors : Function[]
  Events:EventEmitter
}
