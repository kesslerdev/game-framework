
export const NamedContextVarMixin = (name) => (superclass) => class extends superclass {
  get ContextVarName() {
    return name
  }
}
