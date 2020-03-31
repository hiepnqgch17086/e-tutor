import { types } from "mobx-state-tree";

const avatar = types.model({
  avatar: types.optional(types.string, '')
})
  .actions(self => ({
    setAvatar(newValue: string = ''): void {
      self.avatar = newValue
    }
  }))

export const tutorAvatar = types.model({
  tutorAvatar: types.optional(types.string, '')
})
  .actions(self => ({
    setTutorAvatar(newValue: string = ''): void {
      self.tutorAvatar = newValue
    }
  }))

export default avatar
