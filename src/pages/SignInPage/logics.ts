import ProfilePageData from "../ProfilePage/data"
import { toast } from "react-toastify"
import { HOME_PAGE } from "../../routes"

const { currentUser } = ProfilePageData

export const onSignIn = async () => {
  const errorMessage = await currentUser.getDatabaseToken()
  if (errorMessage) {
    toast.error(errorMessage)
    return
  }
  window.location.href = HOME_PAGE;
}
