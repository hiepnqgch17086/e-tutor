import { types } from "mobx-state-tree";

const text = types.model({
  text: types.optional(types.string, '')
})
  .actions(self => ({
    _getTextConstraint(customConstraintString: string = 'Text is required') {
      return text ? '' : customConstraintString
    },
    setText(newValue: string = '') {
      const setRegexToAvoidTags = /[<|>]/gi
      if (setRegexToAvoidTags.test(newValue)) return
      self.text = newValue
    }
  }))

export default text
