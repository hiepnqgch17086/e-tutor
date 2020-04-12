import { types } from "mobx-state-tree";

const path = types.model({
  path: types.optional(types.string, '')
})
  .actions(self => ({
    _getPathConstraint(customConstraintString: string = 'path is required') {
      return path ? '' : customConstraintString
    },
    setPath(newValue: string = '') {
      // const setRegexToAvoidTags = /[<|>]/gi
      // if (setRegexToAvoidTags.test(newValue)) return
      self.path = newValue
    }
  }))

export default path
