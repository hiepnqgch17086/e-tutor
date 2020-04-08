import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { User } from "../../models-one-entity/Users";

const StudentDetailPageData = types.compose(
  'UserDetailPage',
  GeneralPageModel,
  types.model({
    user: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate(userId = 0) {

    }
  }))
  .create({})

export default StudentDetailPageData
