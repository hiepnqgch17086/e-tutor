import { types } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import { User } from "../../models-one-entity/Users";
// import { IS_TUTOR } from "../../models-one-prop/role";

const ProfilePageData = types.compose(
  'ProfilePage',
  setSnapshotNew,
  types.model({
    currentUser: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMount() {
      // if (self.currentUser.role === IS_TUTOR) {
      //   self.currentUser.getDatabaseNumberOfStudentsOfTutor(self.currentUser.id)
      // }
    }
  }))
  .create({})

ProfilePageData.currentUser.getMyProfile()
// get local to reload from token

export default ProfilePageData
