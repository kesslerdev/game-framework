
export const NamedContextVarMixin = (name) => (superclass) => class extends superclass {
  static get ContextVarName() {
    return name
  }
}
