import { types } from "mobx-state-tree";

const isCreatorOn = types.model({
  isCreatorOn: types.optional(types.boolean, false)
})
  .actions(self => ({
    setIsCreatorOn(b: boolean) {
      self.isCreatorOn = b
    }
  }))

export default isCreatorOn
