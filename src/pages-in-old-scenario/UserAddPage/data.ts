import { types } from "mobx-state-tree";
import GeneralPageModel from "../../pages/GeneralPageModel";
import { User } from "../../models-one-entity/Users";

export const passwordDefault = 'a1234567'

const UserAddPageData = types.compose(
  'UserAddPageData',
  GeneralPageModel,
  types.model({
    user: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMount() {
      const { user } = self
      user.setPassword(passwordDefault)
      user.setRepeatPassword(passwordDefault)
    },
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
