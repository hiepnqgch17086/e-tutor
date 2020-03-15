import { types } from "mobx-state-tree";

const phone = types.model({
  phone: types.optional(types.string, ''),
  isPhoneError: types.maybeNull(types.boolean),
})
  .actions(self => ({
    _getPhoneConstraint(): string {
      const regex = /^0[0-9]{8,}$/
      if (!regex.test(self.phone)) {
        this._setIsPhoneError(true)
        return 'Invalid Phone!'
      }
      this._setIsPhoneError(false)
      return ''
    },
    //@ts-ignore
    _setIsPhoneError(newValue: boolean): void {
      self.isPhoneError = newValue
    },
    setPhone(newValue: string = '', shouldValidate: boolean = true): void {
      self.phone = newValue
      if (shouldValidate) this._getPhoneConstraint()
    },
  }))

export default phone
