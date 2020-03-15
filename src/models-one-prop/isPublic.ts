import { types } from "mobx-state-tree";

const isPublic = types.model({
  isPublic: types.optional(types.number, 1)
})
  .actions(self => ({
    setIsPublic() {
      self.isPublic = self.isPublic === 0 ? 1 : 0
    }
  }))

export default isPublic
