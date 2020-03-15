import { types } from "mobx-state-tree";

const dob = types.model({
  dob: types.optional(types.string, '')
})
  .actions(self => ({
    setDob(newValue: string = ''): void {
      self.dob = newValue
    }
  }))


export default dob
