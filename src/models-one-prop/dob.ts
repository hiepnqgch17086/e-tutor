import { types } from "mobx-state-tree";

const dob = types.model({
  dob: types.optional(
    types.union(types.string, types.number),
    ""
  )
})
  .actions(self => ({
    setDob(newValue: string = ''): void {
      self.dob = newValue
    }
  }))


export default dob
