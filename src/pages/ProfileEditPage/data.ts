import { types, clone, getSnapshot } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import { User } from "../../models-one-entity/Users";
import ProfilePageData from "../ProfilePage/data";

const ProfileEditData = types.compose(
  'ProfilePage',
  setSnapshotNew,
  types.model({
    cloneCurrentUser: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMount() {
      // clone currentUser in Profile Page
      const { currentUser } = ProfilePageData
      const cloneUser = clone(currentUser)
      self.cloneCurrentUser.setSnapshotNew(getSnapshot(cloneUser))
    }
  }))
  .create({})


export default ProfileEditData
