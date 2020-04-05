import { types } from "mobx-state-tree";

const isCreatorTyping = types.model({
  isCreatorTyping: types.optional(types.boolean, false)
})
  .actions(self => ({
    setIsCreatorTyping(b: boolean) {
      self.isCreatorTyping = b
    }
  }))

export default isCreatorTyping
