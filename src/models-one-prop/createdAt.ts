import { types } from "mobx-state-tree";

const createdAt = types.model({
  createdAt: types.maybeNull(types.string)
})
  .actions(self => ({
    _setCreatedAtNow(): void {
      self.createdAt = (new Date()).toDateString()
    }
  }))

export default createdAt
