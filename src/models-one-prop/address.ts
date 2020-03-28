import { types } from "mobx-state-tree";

const address = types.model({
  address: types.optional(types.string, ''),
  isAddressError: types.maybeNull(types.boolean)
})
  .actions(self => ({
    _getAddressConstraint(): string {
      // eslint-disable-next-line

      if (!self.address) {
        this._setIsAddressError(true)
        return 'Address is required!'
      }
      this._setIsAddressError(false)
      return ''
    },
    _setIsAddressError(newValue: boolean): void {
      self.isAddressError = newValue
    },
    setAddress(newValue: string = '', shouldValidate: boolean = true): void {
      const setRegexToAvoidTags = /[<|>]/gi
      if (setRegexToAvoidTags.test(newValue)) return
      self.address = newValue
      if (shouldValidate) this._getAddressConstraint()
    }
  }))


export default address
