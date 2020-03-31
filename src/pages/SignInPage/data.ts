import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import ProfilePageData from "../ProfilePage/data"

const { currentUser } = ProfilePageData

const SignInPageData = types.compose(
  'SignInPage',
  GeneralPageModel,
  types.model({
  })
)
  .actions(self => ({
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    /**
     * @param callback , like navigate to another page
     */
    onSignIn: async function (callback = () => { }) {
      const errorMessage = await currentUser.getDatabaseToken()
      if (errorMessage) return
      callback()
    },
  }))
  .create({})

export default SignInPageData
