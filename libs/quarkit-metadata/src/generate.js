import { omit } from 'lodash'
import stampit from '@stamp/it'
import { stampNameRenderer, objectRenderer, arrayRenderer } from './render'

const stampStaticsProperties = Object.keys(stampit().compose.staticProperties)

const stampMetadata = s => {
  if (!s.compose) return {}

  const descriptor = s.compose

  return {
    name: stampNameRenderer(s),
    methods: objectRenderer(descriptor?.methods),
    properties: objectRenderer(descriptor?.properties),
    deepProperties: objectRenderer(descriptor?.deepProperties),
    propertyDescriptors: objectRenderer(descriptor?.propertyDescriptors),
    initializers: arrayRenderer(descriptor?.initializers),
    // remove stamp statics
    staticProperties: objectRenderer(
      omit(descriptor?.staticProperties, stampStaticsProperties),
    ),
    staticDeepProperties: objectRenderer(descriptor?.staticDeepProperties),
    // remove name if setted
    staticPropertyDescriptors: objectRenderer(
      omit(descriptor?.staticPropertyDescriptors, ['name']),
    ),
    composers: arrayRenderer(descriptor?.composers),
    configuration: objectRenderer(descriptor?.configuration),
    deepConfiguration: objectRenderer(descriptor?.deepConfiguration),
  }
}

export default stampMetadata
