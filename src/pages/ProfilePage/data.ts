import { types } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import { User } from "../../models-one-entity/Users";

const ProfilePageData = types.compose(
  'ProfilePage',
  setSnapshotNew,
  types.model({
    currentUser: types.optional(User, {})
  })
)
  .actions(self => ({

  }))
  .create({})

export default ProfilePageData
