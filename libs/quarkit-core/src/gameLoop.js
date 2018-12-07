import Quark from './quark'

const { performance } = require('perf_hooks')
// tps: ticksPerSecond
const GameLoop = Quark.createQuark('GameLoop')
  .props({
    tps: 10,
    gameObjects: [],
    calls: [],
    interval: null,
    started: false,
    processing: false,
  })
  .methods({
    loop() {
      this.gameObjects.forEach(go => go.loop())
      this.calls.forEach(c => c())
    },
    start() {
      this.interval = setInterval(() => {
        if (!this.processing) {
          this.processing = true
          const t0 = performance.now()
          this.loop()
          const t1 = performance.now()

          // metrics
          const execTime = t1 - t0

          this.metrics.times.push(execTime)
          if (this.metrics.times.length > 100) this.metrics.times.shift()

          this.metrics.avgExecTime = this.metrics.times.reduce((t, c) => t + c, 0)
            / this.metrics.times.length

          this.metrics.lastExecTime = execTime

          this.metrics.maxExecTime = execTime > this.metrics.maxExecTime
            ? execTime
            : this.metrics.maxExecTime

          this.metrics.minExecTime = execTime < this.metrics.minExecTime
            ? execTime
            : this.metrics.minExecTime

          this.processing = false
        } else {
          console.warn('laag, gameloop too fast')
        }
      }, 1000 / this.tps)
      this.started = true
    },
    stop() {
      clearInterval(this.interval)
      this.started = false
    },
  })
  .init(function ({ tps }) {
    this.tps = tps
    this.gameObjects = []
    this.metrics = {
      times: [],
      avgExecTime: 0,
      maxExecTime: 0,
      minExecTime: 100,
    }
  })

export default GameLoop
