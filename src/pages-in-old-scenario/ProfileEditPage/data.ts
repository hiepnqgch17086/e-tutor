import { types, clone, getSnapshot } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import { User } from "../../models-one-entity/Users";
import ProfilePageData from "../../pages/ProfilePage/data";
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
      if (!currentUser.id) {
        this.setRedirectToProfilePage()
        return
      }
      const cloneUser = clone(currentUser)
      self.cloneCurrentUser.setSnapshotNew(getSnapshot(cloneUser))
      // console.log(getSnapshot(self))
    },
    onSaveForm: async function () {
      const { currentUser } = ProfilePageData
      // save in server
      const { errorMessage } = await self.cloneCurrentUser.setDatabaseUpdateProfile()
      if (errorMessage) {
        return
      }
      // save in client
      currentUser.setSnapshotUpdate(getSnapshot(self.cloneCurrentUser), currentUser, currentUser._getMainProperties())
      this.setRedirectToProfilePage()
    },
    onWillUnMount() {
      // console.log('onwill unmoit')
      self.setSnapshotNew({})
      // console.log(getSnapshot(self))
    },
    setRedirectToProfilePage() {
      self.shouldRedirectToProfilePage = true
    }
  }))
  .create({})

export default ProfileEditData
