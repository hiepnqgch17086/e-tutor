import { types } from "mobx-state-tree";

const description = types.model({
  description: types.optional(types.string, ''),
  isDescriptionError: types.maybeNull(types.boolean),
})
  .actions(self => ({
    _getDescriptionConstraint(): string {
      if (!self.description) {
        this._setIsDescriptionError(true)
        return 'Description is required'
      }
      this._setIsDescriptionError(false)
      return ''
    },
    _setIsDescriptionError(newValue: boolean): void {
      self.isDescriptionError = newValue
    },
    setDescription(newValue: string = '', shouldValidate: boolean = true): void {
      self.description = newValue
      if (shouldValidate) this._getDescriptionConstraint()
    },
  }))

export default description
