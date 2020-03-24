import { types } from "mobx-state-tree";

export const IS_ADMIN = 1
export const IS_TUTOR = 2
export const IS_STUDENT = 3
const roleList = [IS_ADMIN, IS_STUDENT, IS_TUTOR]

const role = types.model({
  role: types.optional(types.number, 0)
})
  .actions(self => ({
    setRole(newValue: number) {
      if (roleList.indexOf(newValue) >= 0) {
        self.role = newValue
      }
    }
  }))

export default role
