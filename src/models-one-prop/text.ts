import { types } from "mobx-state-tree";

const text = types.model({
  text: types.optional(types.string, '')
})
  .actions(self => ({
    setText(newValue: string = '') {
      self.text = newValue
    }
  }))

export default text
