import {
  pick, isEqual, mergeWith, isObject, isArray, omit,
} from 'lodash'
import stampMetadata from './generate'

const maybe = (a, b = {}) => a || b

const compare = (a, b, loose = false) => {
  if (loose) return isEqual(a, b)
  return a === b
}
const customizer = (objValue, srcValue) => {
  if (isArray(objValue) && isArray(srcValue)) {
    return srcValue.filter(v => objValue.indexOf(v) === -1)
  }

  if (
    isObject(objValue)
    && isObject(srcValue)
    && !isEqual(objValue, srcValue)
  ) {
    const mrg = mergeWith(objValue, srcValue, customizer)
    return pick(mrg, Object.keys(mrg).filter(k => mrg[k]))
  }
  if (isEqual(objValue, srcValue)) {
    return null
  }
  return srcValue
}

const deepDiffObject = (s, p) => {
  const mrg = mergeWith(p, s, customizer)
  return pick(mrg, Object.keys(mrg).filter(k => mrg[k]))
}

const diffArray = (s, p, loose = true) => maybe(s, []).filter(i => p.every(pItem => !compare(i, pItem, loose)))

const diffObject = (s, p, loose = true) => pick(maybe(s), Object.keys(maybe(s)).filter(k => !compare(s[k], p[k], loose)))

const diffMetadata = (stamp, parent) => {
  const stampMeta = stamp.compose ? stampMetadata(stamp) : stamp
  const parentMeta = parent.compose ? stampMetadata(parent) : parent

  return {
    name: parentMeta.name !== stampMeta.name ? stampMeta.name : undefined,
    methods: diffObject(stampMeta.methods, parentMeta.methods),
    properties: diffObject(stampMeta.properties, parentMeta.properties),
    deepProperties: deepDiffObject(
      stampMeta.deepProperties,
      parentMeta.deepProperties,
    ),
    propertyDescriptors: diffObject(
      stampMeta.propertyDescriptors,
      parentMeta.propertyDescriptors,
    ),
    initializers: diffArray(stampMeta.initializers, parentMeta.initializers),
    staticProperties: diffObject(
      stampMeta.staticProperties,
      parentMeta.staticProperties,
    ),
    staticDeepProperties: deepDiffObject(
      stampMeta.staticDeepProperties,
      parentMeta.staticDeepProperties,
    ),
    staticPropertyDescriptors: diffObject(
      stampMeta.staticPropertyDescriptors,
      parentMeta.staticPropertyDescriptors,
    ),
    composers: diffArray(stampMeta.composers, parentMeta.composers),
    configuration: diffObject(
      stampMeta.configuration,
      parentMeta.configuration,
    ),
    deepConfiguration: deepDiffObject(
      stampMeta.deepConfiguration,
      parentMeta.deepConfiguration,
    ),
  }
}

const quarkitDiffMetadata = (stamp, parent) => {
  const meta = !parent ? stampMetadata(stamp) : diffMetadata(stamp, parent)

  return {
    ...meta,
    quark: stamp.quark,
    quarks: stamp.quarks.filter(q => q !== stamp.quark),
    methods: omit(
      meta.methods,
      Object.keys(maybe(meta?.deepConfiguration?.interop?.methods)),
    ),
  }
}

export { diffMetadata, quarkitDiffMetadata }
