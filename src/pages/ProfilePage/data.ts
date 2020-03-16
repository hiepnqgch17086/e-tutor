import { types, onSnapshot } from "mobx-state-tree";
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
    afterCreate() {
      // with any change on current user, will set local
      onSnapshot(self.currentUser, self.currentUser.setLocal)
      // weakness: will save local first, not save server first
    }
  }))
  .create({})

// get local to reload from token
ProfilePageData.currentUser.getLocal()

export default ProfilePageData
