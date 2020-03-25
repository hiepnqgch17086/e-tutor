import { types, getSnapshot } from "mobx-state-tree";
import id from "../models-one-prop/id";
import email from "../models-one-prop/email";
import password, { repeatPassword } from "../models-one-prop/password";
import name from "../models-one-prop/name";
import dob from "../models-one-prop/dob";
import gender from "../models-one-prop/gender";
import phone from "../models-one-prop/phone";
import address from "../models-one-prop/address";
import GeneralModel from "./GeneralModel";
import { ErrorMessage, Response } from "./types";
import API from "../api";
import { setLocalStorageAuthToken, getLocalStorageAuthToken, setLocalStorageAuthTokenDelete } from "../routes";
import GeneralModelList from "./GeneralModelList";
import avatar from "../models-one-prop/avatar";
import role, { IS_ADMIN, IS_TUTOR } from "../models-one-prop/role";
import PaginationModel from "./PaginationModel";

const UserMoreProps = types.compose(
  name, dob, gender, phone, address,
  repeatPassword, avatar,
)

export const User = types.compose(
  'User',
  UserMoreProps,
  GeneralModel,
  id, email, password,
  role
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainThreadOfGettingDatabase() {
      return API.getUser(self.id)
    },
    /**
     * @override
     */
    _getMainProperties(): Array<string> {
      return ['id', 'email', 'password', 'name', 'dob', 'gender', 'phone', 'address', 'avatar', 'role']
    },

    /**
     * @override
     */
    _getValidation(): Array<string> {
      return [
        self._getPhoneConstraint(),
        self._getEmailConstraint(),
        self._getPasswordConstraint(),
        self._getRepeatPasswordConstraint()
      ]
    },
    setDatabaseUpdateProfile: async function (): Promise<Response> {
      /**
       * if snapshot, update with snapshot, else update with self
       */
      try {
        const validation = [
          self._getPhoneConstraint(),
          self._getNameConstraint(),
          self._getGenderConstraint(),
          self._getDobConstraint(),
          self._getAddressConstraint(),
        ]
        for (const constraint of validation) {
          if (constraint) throw new Error(constraint)
        }

        const updatedProps = self._getMainProperties()

        const snapshotUpdate = self._getProperties(updatedProps)
        if (typeof snapshotUpdate === 'string') throw new Error(snapshotUpdate)

        const res = await API.setUserUpdateProfile(snapshotUpdate)
        const data = res.data
        return {
          isSuccess: true,
          data
        }
      } catch ({ message }) {
        console.log('setDatabaseUpdate():', message)
        return {
          isSuccess: false,
          errorMessage: message
        }
      }
    },
    /**
     * Login
     */
    getDatabaseToken: async function (): Promise<ErrorMessage> {
      try {
        // will change later
        const response = await API.getAuthToken({ email: self.email, password: self.password })

        const data = response.data

        self.setSnapshotUpdate(data)

        this.setLocal()
        return ''
      } catch (error) {
        console.log(error.message)
        return 'Something went wrong!'
      }
    },
    setLocal() {
      setLocalStorageAuthToken(JSON.stringify(getSnapshot(self)))
    },
    getLocal() {
      const snapshot = getLocalStorageAuthToken()
      // console.log(snapshot)
      self.setSnapshotNew(snapshot)
    },
    setLogout() {
      // self.setSnapshotNew({})
      setLocalStorageAuthTokenDelete()
    }
  }))
  .views(self => ({
    get isAdmin() {
      return self.role === IS_ADMIN
    },
    get isTutor() {
      return self.role === IS_TUTOR
    },
  }))

export const defaultOfUser = User.create({})

type GetUsersProp = {
  email?: string
}

const Users = types.compose(
  'Users',
  GeneralModelList,
  PaginationModel,
  types.model({
    items: types.array(User)
  })
)
  .actions(self => ({
    getDatabaseItems: async function () {
      // const { email } = props
      // console.log(email)
      // console.log(self.searchByEmail)
      // if (email || self.searchByEmail) {
      //   self.setSearchByEmail(email)
      //   // self.setPage(1)
      //   // const response = await API.getUsersByEmail({ email: self.searchByEmail, limit: self.limit, page: self.page })
      //   // self.setSnapshotNew(response.data, self.items)
      //   // return
      // }

      const response = await API.getUsers({
        page: self.page,
        limit: self.limit,
        email: self.searchByEmail
      })

      self.setSnapshotNew(response.data, self.items)

    },
    // getDatabaseItemsByEmail: async function (email: string) {
    //   if (email) {

    //   }
    //   // this.getDatabaseItems({ limit: self.limit, page: self.page })
    // }
  }))

export default Users

export const defaultOfUsers = Users.create({})
