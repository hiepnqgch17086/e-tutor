import { types } from "mobx-state-tree";

const email = types.model({
  email: types.optional(types.string, ''),
  isEmailError: types.maybeNull(types.boolean),
})
  .actions(self => ({
    _getEmailConstraint(): string {
      // eslint-disable-next-line
      const regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
      if (!regex.test(self.email)) {
        this._setIsEmailError(true)
        return 'Invalid email'
      }
      this._setIsEmailError(false)
      return ''
    },
    _setIsEmailError(newValue: boolean): void {
      self.isEmailError = newValue
    },
    setEmail(newValue: string = '', shouldValidate: boolean = true): void {
      self.email = newValue
      if (shouldValidate) this._getEmailConstraint()
    },
  }))

export default email
