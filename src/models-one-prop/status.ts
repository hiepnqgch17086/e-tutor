import { types } from "mobx-state-tree";

const status = types.model({
  status: types.optional(types.number, 1)
})
  .actions(self => ({
    setToggleStatus() {
      self.status = self.status === 0 ? 1 : 0
    }
  }))

export default status
