import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { User } from "../../models-one-entity/Users";

const UserAddPageData = types.compose(
  'UserAddPageData',
  GeneralPageModel,
  types.model({
    user: types.optional(User, {})
  })
)
  .actions(self => ({
    // onDidMount() {

    // },
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    onSaveForm: async function (callback: Function) {
      const { user } = self
      const { isSuccess } = await user.setDatabaseNew()
      if (isSuccess) callback()
    }
  }))
  .create({})

export default UserAddPageData
