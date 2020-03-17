import { types } from "mobx-state-tree";

const createdAt = types.model({
  createdAt: types.optional(
    types.union(types.string, types.number, types.null),
    null
  )
})
  .actions(self => ({
    _setCreatedAtNow(): void {
      // self.createdAt = Date.now()
      // api will handle
    }
  }))

export default createdAt
