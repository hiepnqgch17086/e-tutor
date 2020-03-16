import { types } from "mobx-state-tree";

const updatedAt = types.model({
  updatedAt: types.maybeNull(types.number)
})
  .actions(self => ({
    _setUpdatedAtNow(): void {
      self.updatedAt = Date.now()
    }
  }))

export default updatedAt
