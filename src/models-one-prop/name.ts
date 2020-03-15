import { types } from "mobx-state-tree";

const name = types.model({
  name: types.optional(types.string, '')
})
  .actions(self => ({
    setName(newValue: string = ''): void {
      self.name = newValue
    }
  }))


export default name
