import { types, clone, getSnapshot } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import { User } from "../../models-one-entity/Users";
import ProfilePageData from "../ProfilePage/data";
import { toast } from "react-toastify";

const ProfileEditData = types.compose(
  'ProfilePage',
  setSnapshotNew,
  types.model({
    cloneCurrentUser: types.optional(User, {}),
    shouldRedirectToProfilePage: types.optional(types.boolean, false)
  })
)
  .actions(self => ({
    onDidMount() {
      // clone currentUser in Profile Page
      const { currentUser } = ProfilePageData
      const cloneUser = clone(currentUser)
      self.cloneCurrentUser.setSnapshotNew(getSnapshot(cloneUser))
    },
    onSaveForm: async function () {
      const { currentUser } = ProfilePageData
      // save in server
      const { errorMessage } = await self.cloneCurrentUser.setDatabaseUpdateProfile()
      if (errorMessage) {
        toast.error(errorMessage)
        return
      }
      // save in client
      currentUser.setSnapshotUpdate(getSnapshot(self.cloneCurrentUser))
      this.setRedirectToProfilePage()
    },
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    setRedirectToProfilePage() {
      self.shouldRedirectToProfilePage = true
    }
  }))
  .create({})

export default ProfileEditData
