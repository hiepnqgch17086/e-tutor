import { types } from "mobx-state-tree";

const address = types.model({
  address: types.optional(types.string, '')
})
  .actions(self => ({
    setAddress(newValue: string = ''): void {
      const setRegexToAvoidTags = /[<|>]/gi
      if (setRegexToAvoidTags.test(newValue)) return
      self.address = newValue
    }
  }))


export default address
