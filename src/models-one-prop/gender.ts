import { types } from "mobx-state-tree";

const gender = types.model({
  gender: types.optional(types.string, '')
})
  .actions(self => ({
    setGender(newValue: string = ''): void {
      self.gender = newValue
    }
  }))


export default gender
