import { types } from "mobx-state-tree";

const title = types.model({
  title: types.optional(types.string, ''),
  isTitleError: types.maybeNull(types.boolean),
})
  .actions(self => ({
    _getTitleConstraint(): string {
      if (!self.title) {
        this._setIsTitleError(true)
        return 'Title is required'
      }
      this._setIsTitleError(false)
      return ''
    },
    _setIsTitleError(newValue: boolean): void {
      self.isTitleError = newValue
    },
    setTitle(newValue: string = '', shouldValidate: boolean = true): void {
      self.title = newValue
      if (shouldValidate) this._getTitleConstraint()
    },
  }))

export default title
