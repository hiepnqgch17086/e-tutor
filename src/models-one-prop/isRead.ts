import { types } from "mobx-state-tree";

const isRead = types.model({
  isRead: types.optional(types.boolean, false)
})
  .actions(self => ({
    setIsRead(newValue: boolean) {
      self.isRead = newValue
    }
  }))

export default isRead
