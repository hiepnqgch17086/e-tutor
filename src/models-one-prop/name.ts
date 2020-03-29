import { types } from "mobx-state-tree";

const name = types.model({
  name: types.optional(types.string, ''),
  isNameError: types.maybeNull(types.boolean)
})
  .actions(self => ({
    _getNameConstraint(): string {
      // eslint-disable-next-line
      const regex = /^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]([a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{5,})$/
      if (!regex.test(self.name)) {
        this._setIsNameError(true)
        return 'Name is required, at least 6 character!'
      }
      this._setIsNameError(false)
      return ''
    },
    _setIsNameError(newValue: boolean): void {
      self.isNameError = newValue
    },
    setName(newValue: string = '', shouldValidate: boolean = true): void {
      const setRegexToAvoidTags = /[<|>|@|#|$|%|&|*|(|)|^|!|0-9]/gi
      if (setRegexToAvoidTags.test(newValue)) return
      self.name = newValue
      if (shouldValidate) this._getNameConstraint()
    }
  }))

export const tutorName = types.model({
  tutorName: types.optional(types.string, '')
})


export default name
