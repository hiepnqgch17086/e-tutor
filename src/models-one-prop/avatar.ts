import { types } from "mobx-state-tree";

const avatar = types.model({
  avatar: types.optional(types.string, '')
})
  .actions(self => ({
    setAvatar(newValue: string = ''): void {
      self.avatar = newValue
    }
  }))


export default avatar
