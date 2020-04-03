import { types } from "mobx-state-tree";
import Users from "../../models-one-entity/Users";
import GeneralPageModel from "../GeneralPageModel";

const TutoListPageData = types.compose(
  'TutoListPage',
  GeneralPageModel,
  types.model({
    users: types.optional(Users, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate() {
      const { users } = self
      users.getDbStudentUsersWhoHaveNotTutor()
    },
    onWillUnMount() {
      self.setSnapshotNew({})
    },

  })).create({})

export default TutoListPageData
