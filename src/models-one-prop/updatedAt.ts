import { types } from "mobx-state-tree";

const updatedAt = types.model({
  updatedAt: types.maybeNull(types.string)
})
  .actions(self => ({
    _setUpdatedAtNow(): void {
      self.updatedAt = (new Date()).toDateString()
    }
  }))

export default updatedAt
