import { types } from "mobx-state-tree";

const updatedAt = types.model({
  updatedAt: types.maybeNull(types.Date)
})
  .actions(self => ({
    _setUpdatedAtNow(): void {
      self.updatedAt = new Date()
    }
  }))

export default updatedAt
