import { types } from "mobx-state-tree";

const body = types.model({
  body: types.optional(types.string, ''),
  isBodyError: types.maybeNull(types.boolean),
})
  .actions(self => ({
    _getBodyConstraint(): string {
      if (!self.body.length) {
        this._setIsBodyError(true)
        return 'Body is required'
      }
      this._setIsBodyError(false)
      return ''
    },
    _setIsBodyError(newValue: boolean): void {
      self.isBodyError = newValue || null
    },
    setBody(newValue: string = '', shouldValidate: boolean = true): void {
      self.body = newValue
      if (shouldValidate) this._getBodyConstraint()
    },
  }))

export default body
