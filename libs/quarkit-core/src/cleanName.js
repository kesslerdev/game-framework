import { camelCase, upperFirst } from 'lodash'

export default n => upperFirst(camelCase(n))
