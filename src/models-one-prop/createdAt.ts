import { types } from "mobx-state-tree";

const createdAt = types.model({
  createdAt: types.maybeNull(types.Date)
})
  .actions(self => ({
    _setCreatedAtNow(): void {
      self.createdAt = new Date()
    }
  }))

export default createdAt
