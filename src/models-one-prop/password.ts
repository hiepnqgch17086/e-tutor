import { types } from "mobx-state-tree";

const password = types.model({
  password: types.optional(types.string, ''),
  isPasswordError: types.maybeNull(types.boolean),
  repeatPassword: types.optional(types.string, ''),
  isRepeatPasswordError: types.maybeNull(types.boolean),
})
  .actions(self => ({
    _getPasswordConstraint(): string {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!regex.test(self.password)) {
        this._setIsPasswordError(true)
        return 'Password: Minimum eight characters, at least one letter and one number!'
      }
      this._setIsPasswordError(false)
      return ''
    },
    _setIsPasswordError(newValue: boolean | null = null): void {
      self.isPasswordError = newValue
    },
    _getRepeatPasswordConstraint(): string {
      //@ts-ignore
      if (self.repeatPassword !== self.password) {
        this._setIsRepeatPasswordError(true)
        return 'Wrong repeat password!'
      }
      this._setIsRepeatPasswordError(false)
      return ''
    },
    _setIsRepeatPasswordError(newValue: boolean | null = null): void {
      self.isRepeatPasswordError = newValue
    },
    setPassword(newValue: string = '', shouldValidate: boolean = true): void {
      const setRegexToAvoidTags = /[<|>]/gi
      if (setRegexToAvoidTags.test(newValue)) return

      self.password = newValue
      if (shouldValidate) this._getPasswordConstraint()
    },
    setRepeatPassword(newValue: string = '', shouldValidate: boolean = true): void {
      const setRegexToAvoidTags = /[<|>]/gi
      if (setRegexToAvoidTags.test(newValue)) return

      self.repeatPassword = newValue
      if (shouldValidate) this._getRepeatPasswordConstraint()
    },
  }))

export default password
