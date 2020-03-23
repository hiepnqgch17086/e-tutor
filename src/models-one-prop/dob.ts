import { types } from "mobx-state-tree";

const dob = types.model({
  dob: types.optional(
    types.union(types.string, types.number),
    ""
  ),
  isDobError: types.maybeNull(types.boolean)
})
  .actions(self => ({
    _getDobConstraint(): string {
      // eslint-disable-next-line

      if (!self.dob) {
        this._setIsDobError(true)
        return 'Date of birth is required!'
      }
      this._setIsDobError(false)
      return ''
    },
    _setIsDobError(newValue: boolean): void {
      self.isDobError = newValue
    },
    setDob(newValue: string = ''): void {
      self.dob = newValue
    }
  }))


export default dob
