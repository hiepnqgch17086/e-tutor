import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { User } from "../../models-one-entity/Users";
import { IS_TUTOR } from "../../models-one-prop/role";

const UserDetailPageData = types.compose(
  'UserDetailPage',
  GeneralPageModel,
  types.model({
    user: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate(tutorId = 0) {
      self.user.setId(tutorId)
      // self.user.getDatabase
    }
  }))
  .create({
    user: { role: IS_TUTOR }
  })

export default UserDetailPageData
