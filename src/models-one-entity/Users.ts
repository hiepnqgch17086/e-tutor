import { types, getParent } from "mobx-state-tree";
import id from "../models-one-prop/id";
import email from "../models-one-prop/email";
import password from "../models-one-prop/password";
import name from "../models-one-prop/name";
import GeneralModel from "./GeneralModel";
import { ErrorMessage, Response } from "./types";
import API from "../api";
import { setLocalStorageAuthIdToken, setLocalStorageAuthTokenDelete } from "../routes";
import GeneralModelList from "./GeneralModelList";
import avatar from "../models-one-prop/avatar";
import role, { IS_ADMIN, IS_TUTOR, IS_STUDENT } from "../models-one-prop/role";
import { toast } from "react-toastify";

export const User = types.compose(
  'User',
  GeneralModel,
  id, email, password, name, avatar,
  role
)
  .actions(self => ({
    /**
     * @override
     */
    _getValidation(): Array<string> {
      return [
        self._getNameConstraint(),
        self._getEmailConstraint(),
        self._getPasswordConstraint(),
        self._getRepeatPasswordConstraint()
      ]
    },

    // SPECIAL METHODS
    // Login
    getDatabaseToken: async function (): Promise<ErrorMessage> {
      try {
        // will change later
        const response = await API.getAuthToken({ email: self.email, password: self.password })
        // console.log('data')
        const { data: { user, token, errorMessage } } = response
        // console.log(response.data)
        if (errorMessage) throw new Error(errorMessage)

        self.setSnapshotUpdate(user)

        // console.log(self)

        this.setAuthIdToken(token)
        return ''
      } catch (error) {
        toast.error(error.message)
        return 'Something went wrong!'
      }
    },
    getMyProfile: async function (): Promise<ErrorMessage> {
      try {
        const { data: { user, errorMessage } } = await API.getMyProfile()
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate(user)
        return ''
      } catch (error) {
        return error.message
      }
    },
    setAuthIdToken(token: string) {
      setLocalStorageAuthIdToken(token)
    },
    setLogout() {
      // self.setSnapshotNew({})
      setLocalStorageAuthTokenDelete()
    },
    setDatabaseMyPasswordUpdate: async function (oldPassword: string): Promise<Response> {
      try {

        const validation = [
          self._getPasswordConstraint(),
          self._getRepeatPasswordConstraint()
        ]

        for (const constraint of validation) {
          if (constraint) throw new Error(constraint)
        }

        const { data: { errorMessage } } = await API.setMyPasswordUpdate({ oldPassword, newPassword: self.password })
        if (errorMessage) throw new Error(errorMessage)

        return {
          isSuccess: true
        }
      } catch ({ message }) {
        toast.error(message)
        return {
          isSuccess: false,
          errorMessage: message
        }
      }
    }
  }))
  .views(self => ({
    get isAdmin() {
      return self.role === IS_ADMIN
    },
    get isTutor() {
      return self.role === IS_TUTOR
    },
    get isStudent() {
      return self.role === IS_STUDENT
    },
    get parentUserList(): any {
      return getParent(self, 2)
    }
  }))

export const defaultOfUser = User.create({})


const Users = types.compose(
  'Users',
  GeneralModelList,
  types.model({
    items: types.array(User)
  })
)
  .actions(self => ({
    setItemsToAdd(snapshot: Object) {
      const newUser = User.create(snapshot)
      self.items.push(newUser)
      // console.log(getSnapshot(self.items))
    },
    setItemsToRemove(id: string | number) {
      self.items.splice(self.items.findIndex(i => i.id === id), 1)
      // console.log(getSnapshot(self.items))
    },
  }))

export default Users

export const defaultOfUsers = Users.create({})
