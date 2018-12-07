import { GameObject, interopMethodTypes } from 'quarkit-core'
import { flattenDeep } from 'lodash'

const math = require('quarkit-mathjs')

const Expr = GameObject.createInteropMethod('modifiers', {
  type: interopMethodTypes.flattenDeep,
  uniq: true,
})

const ExpressionContextName = Expr.createQuark('ExprCtx').statics({
  expressionName(n) {
    return this.deepConf({
      exprNames: [n],
    })
  },
})

const ExpressionProvider = Expr.createQuark('Expr').methods({
  // to be used by Quark such RessourceBag
  createExpressionResolver(expr) {
    if (typeof expr !== 'string') {
      throw new Error('Only strings are accepted')
    }
    const compiled = math.compile(expr)
    return (context, modifiers = []) => {
      let value = null
      try {
        console.log('lost modifiers', modifiers)
        value = compiled.eval(context)
      } catch (e) {
        console.warn(`Error during parsing Expression ${expr}, error : `, e)
      }
      return value
    }
  },
  createContext(...args) {
    let context = { this: args[0] }

    args.forEach(a => {
      const names = a?.getQuark()?.getDeepConf()?.exprNames

      if (names && names.length) {
        names.forEach(n => {
          context = {
            ...context,
            [n]: a,
          }
        })
      }
    })

    return context
  },
  collectModifiers(tags, ...args) {
    return flattenDeep(
      args.map(a => a?.modifiers(tags)).filter(a => a !== undefined),
    )
  },
})

export { ExpressionContextName, ExpressionProvider }
