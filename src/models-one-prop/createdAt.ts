import { types } from "mobx-state-tree";

const createdAt = types.model({
  createdAt: types.maybeNull(types.number)
})
  .actions(self => ({
    _setCreatedAtNow(): void {
      self.createdAt = Date.now()
    }
  }))

export default createdAt
