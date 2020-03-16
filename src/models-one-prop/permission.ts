import { types } from "mobx-state-tree";

const permission = types.model({
  permission: types.optional(types.string, '')
})
  .actions(self => ({
    setPermission(newV: string = '') {
      self.permission = newV
    }
  }))

export default permission
