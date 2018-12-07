import Quark from './quark'
import { Interop, interopMethodTypes } from './interop'
import cleanName from './cleanName'

const GameObject = Quark.compose(Interop)
  .createQuark('GameObject')
  .createInteropMethod('loop', {
    type: interopMethodTypes.loop,
    uniq: true,
  })
  .createInteropMethod('getRelated', {
    type: interopMethodTypes.flattenDeep,
    uniq: true,
  })
  .createInteropMethod('loopRelated', {
    type: interopMethodTypes.loop,
    uniq: true,
  })
  .implementInteropMethod('loop', function () {
    this.getRelated().forEach(go => {
      if (go instanceof GameObject) {
        go.loopRelated(this)
      }
    })
  })
  .compose({
    init({ name = null }, { stamp }) {
      if (!name) {
        throw new Error(
          `Cannot create GameObject(${
            this.quark
          }) name arg(${name}) is required`,
        )
      }
      this.name = cleanName(name)
      this.slug = `${this.name}::${stamp.quark}<${stamp.quarks
        .slice(0, -1)
        .reverse()
        .join(',')}>`
    },
    methods: {
      equals(gameObject) {
        return gameObject.slug === this.slug
      },
    },
    properties: {
      slug: 'runtime generated',
    },
  })

export default GameObject
