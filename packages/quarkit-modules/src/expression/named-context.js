
export const NamedContextVar = (name) => (superclass) => class extends superclass {
  get ContextVarName() {
    return name
  }
}
