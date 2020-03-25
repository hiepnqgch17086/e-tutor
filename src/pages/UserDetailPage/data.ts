import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { User } from "../../models-one-entity/Users";

const UserDetailPageData = types.compose(
  'UserDetailPage',
  GeneralPageModel,
  types.model({
    user: types.optional(User, {})
  })
)
  .actions(self => ({

  }))
  .create({})

export default UserDetailPageData
