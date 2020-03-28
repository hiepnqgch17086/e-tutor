import { types } from "mobx-state-tree";

export const IS_ADMIN = 1
export const IS_TUTOR = 2
export const IS_STUDENT = 3
const roleList = [IS_ADMIN, IS_STUDENT, IS_TUTOR]

const role = types.model({
  role: types.optional(types.number, 0),
  isRoleError: types.maybeNull(types.boolean)
})
  .actions(self => ({
    _getRoleConstraint() {
      if (roleList.indexOf(self.role) >= 0) {
        this._setIsRoleError(false)
        return ''
      }
      this._setIsRoleError(true)
      return 'Role is required!'
    },
    _setIsRoleError(newValue: boolean | null): void {
      self.isRoleError = newValue
    },
    setRole(newValue: number, shouldValidate = true) {
      if (roleList.indexOf(newValue) >= 0) {
        self.role = newValue
        if (shouldValidate) this._getRoleConstraint()
      }
    }
  }))

export default role
