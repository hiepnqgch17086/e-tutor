import { types } from "mobx-state-tree";
import ClassListPageModel from '../model'


const ForAdminData = types.compose(
  'ForAdmin',
  ClassListPageModel,
  types.model({})
)
  .actions(self => ({
    onDidMount() {
      self.classes.getDatabaseItemsForAdmin()
    }
  }))
  .create({})

export default ForAdminData
