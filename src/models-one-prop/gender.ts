import { types } from "mobx-state-tree";

const gender = types.model({
  gender: types.optional(types.string, ''),
  isGenderError: types.maybeNull(types.boolean)
})
  .actions(self => ({
    _getGenderConstraint(): string {
      // eslint-disable-next-line

      if (!self.gender) {
        this._setIsGenderError(true)
        return 'Gender is required!'
      }
      this._setIsGenderError(false)
      return ''
    },
    _setIsGenderError(newValue: boolean): void {
      self.isGenderError = newValue
    },
    setGender(newValue: string = '', shouldValidate: boolean = true): void {
      self.gender = newValue
      if (shouldValidate) this._getGenderConstraint()
    }
  }))


export default gender
