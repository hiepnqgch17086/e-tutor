import { types } from "mobx-state-tree";

const avatar = types.model({
  avatar: types.maybeNull(types.string)
})
  .actions(self => ({
    setAvatar(newValue: string = ''): void {
      self.avatar = newValue
    }
  }))

export const tutorAvatar = types.model({
  tutorAvatar: types.maybeNull(types.string)
})
  .actions(self => ({
    setTutorAvatar(newValue: string = ''): void {
      self.tutorAvatar = newValue
    }
  }))

export default avatar
