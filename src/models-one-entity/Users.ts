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
import role, { IS_ADMIN, IS_TUTOR } from "../models-one-prop/role";
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

        const { data: { user, token } } = response

        self.setSnapshotUpdate(user)

        this.setAuthIdToken(token)
        return ''
      } catch (error) {
        toast.error(error.message)
        return 'Something went wrong!'
      }
    },
    setAuthIdToken(token: string) {
      setLocalStorageAuthIdToken(token)
    },
    setLogout() {
      // self.setSnapshotNew({})
      setLocalStorageAuthTokenDelete()
    },
    setDatabaseMyPasswordUpdate: async function (): Promise<Response> {
      try {

        const validation = [
          self._getPasswordConstraint(),
          self._getRepeatPasswordConstraint()
        ]

        for (const constraint of validation) {
          if (constraint) throw new Error(constraint)
        }

        const updatedProps = self._getMainProperties()
        const snapshotUpdate = self._getSnapshotWithProperties(updatedProps)
        if (typeof snapshotUpdate === 'string') throw new Error(snapshotUpdate)

        await API.setMyPasswordUpdate(snapshotUpdate)

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
    get parentUserList(): any {
      return getParent(self, 2)
    }
  }))

export const defaultOfUser = User.create({})

type GetUsersProp = {
  email?: string
}

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
