import { Mixin, mix } from 'quarkit-mixin'

export const GameLoopMixin = Mixin((superclass) => class extends superclass {

  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.

    super(...args)
    this.ticks = args[0]
  }

  static createGameLoop(...args) {
    return new this(...args)
  }

  get GameObjects() {
    return this._gameObjects || (this._gameObjects = [])
  }

  get Calls() {
    return this._calls || (this._calls = [])
  }

  get Started() {
    return this.started || false
  }

  set TicksTime(value) {
    let restart = false
    if (value !== this.ticks && this.Started) {
      this.stop()
      restart = true
    }
    this.ticks = value
    if (restart) {
      this.start()
    }
  }

  get TicksTime() {
    return this.ticks
  }

  registerFunctionCall(functionCall) {
    this.Calls.push(functionCall)
  }

  registerGameObject(gameObject) {
    this.GameObjects.push(gameObject)
  }

  start() {
    this.interval = setInterval(() => {
      this.loop()
    }, this.ticks)
    this.started = true
  }

  stop() {
    clearInterval(this.interval)
    this.started = false
  }

  loop() {
    this.GameObjects.forEach((go) => {
      go.loop()
    })

    this.Calls.forEach((call) => {
      call()
    })
  }

})

export class GameLoop extends mix().with(GameLoopMixin) {}
