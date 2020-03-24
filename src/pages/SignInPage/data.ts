import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import ProfilePageData from "../ProfilePage/data"
import { toast } from "react-toastify"

const { currentUser } = ProfilePageData

const SignInPageData = types.compose(
  'SignInPage',
  GeneralPageModel,
  types.model({
    shouldRedirectToHomepage: types.optional(types.boolean, false)
  })
)
  .actions(self => ({
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    onSignIn: async function () {
      const errorMessage = await currentUser.getDatabaseToken()
      if (errorMessage) {
        toast.error(errorMessage)
        return
      }
      this.setRedirectToHomepage()
    },
    setRedirectToHomepage() {
      self.shouldRedirectToHomepage = true
    }
  }))
  .create({})

export default SignInPageData
