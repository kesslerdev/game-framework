import { parse } from 'babylon'
import { createHash } from 'crypto'

const stampNameRenderer = s => s?.compose?.staticPropertyDescriptors?.name?.value || s.name

const stringRenderer = i => `${i}`

const funcArgsRenderer = func => {
  try {
    const prog = typeof func === 'string' ? func : `(\n${func.toString()}\n)`

    const ast = parse(prog)
    const { program } = ast

    return program.body[0].expression.params.map(node => prog.slice(node.start, node.end).replace(/\s+/g, ''))
  } catch (e) {
    if (typeof func === 'string') {
      return ['???']
    }
    return funcArgsRenderer(`(\n function ${func.toString()}\n)`)
  }
}

const objectRenderer = (o, cb = autoRenderer) => Object.entries(o instanceof Object ? o : []).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [k]: cb(v),
  }),
  {},
)

const arrayRenderer = (a, cb = autoRenderer) => (a instanceof Array ? a : []).map(cb)

const autoRenderer = i => {
  if (i === undefined) return undefined
  if (typeof i === 'function') {
    return {
      type: 'function',
      name: i.name,
      args: funcArgsRenderer(i),
      hash: createHash('sha256')
        .update(stringRenderer(i))
        .digest('hex'),
    }
  }
  if (i instanceof Array) return arrayRenderer(i)
  if (typeof i === 'object') return objectRenderer(i)

  return stringRenderer(i)
}

export {
  stampNameRenderer,
  stringRenderer,
  funcArgsRenderer,
  objectRenderer,
  arrayRenderer,
  autoRenderer,
}
