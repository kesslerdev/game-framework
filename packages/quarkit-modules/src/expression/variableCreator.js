import { Variable } from './Variable'

export function variableCreator(
  value,
  contextAccessor = () => new {}(),
  onUpdateCallback = () => {}
) {
  const variable = new Variable(value)
  variable.setContextAccessor(contextAccessor)
  variable.setOnUpdateCallback(onUpdateCallback)
  return variable
}
