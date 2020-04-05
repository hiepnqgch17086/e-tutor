import { types } from "mobx-state-tree";

const isStudentTyping = types.model({
  isStudentTyping: types.optional(types.boolean, false)
})
  .actions(self => ({
    setIsStudentTyping(b: boolean) {
      self.isStudentTyping = b
    }
  }))

export default isStudentTyping
