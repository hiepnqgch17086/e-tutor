import { types } from "mobx-state-tree";

const isStudentOn = types.model({
  isStudentOn: types.optional(types.boolean, false)
})
  .actions(self => ({
    setIsStudentOn(b: boolean) {
      self.isStudentOn = b
    }
  }))

export default isStudentOn
