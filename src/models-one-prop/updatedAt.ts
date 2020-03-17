import { types } from "mobx-state-tree";

const updatedAt = types.model({
  updatedAt: types.optional(
    types.union(types.string, types.number, types.null),
    null
  )
})
  .actions(self => ({
    _setUpdatedAtNow(): void {
      // self.updatedAt = Date.now()
      // api will handle
    }
  }))

export default updatedAt
