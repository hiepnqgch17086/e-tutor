import { types, getSnapshot, getParent } from "mobx-state-tree";
import id from "../models-one-prop/id";
import email from "../models-one-prop/email";
import password from "../models-one-prop/password";
import name from "../models-one-prop/name";
import dob from "../models-one-prop/dob";
import gender from "../models-one-prop/gender";
import phone from "../models-one-prop/phone";
import address from "../models-one-prop/address";
import GeneralModel from "./GeneralModel";
import { ErrorMessage, Response } from "./types";
import API from "../api";
import { setLocalStorageAuthIdToken, setLocalStorageAuthTokenDelete } from "../routes";
import GeneralModelList from "./GeneralModelList";
import avatar from "../models-one-prop/avatar";
import role, { IS_ADMIN, IS_TUTOR } from "../models-one-prop/role";
import { toast } from "react-toastify";

const UserMoreProps = types.compose(
  name, dob, gender, phone, address,
  avatar,
)

export const User = types.compose(
  'User',
  UserMoreProps,
  GeneralModel,
  id, email, password,
  role
)
  .actions(self => ({
    _getMainThreadOfSettingDatabaseNew(snapshot: Object) {
      return API.setUserNew(snapshot)
    },
    /**
     * @override
     */
    _getMainThreadOfGettingDatabase() {
      return API.getUser(self.id)
    },
    /**
     * @override
     */
    _getMainThreadOfSettingDatabaseDelete() {
      return API.setUserDelete(self.id)
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
        self._getRoleConstraint(),
        self._getNameConstraint(),
        self._getGenderConstraint(),
        self._getPhoneConstraint(),
        self._getAddressConstraint(),
        self._getDobConstraint(),
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

        const data = response.data

        self.setSnapshotUpdate(data)

        this.setAuthIdToken()
        return ''
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
        return 'Something went wrong!'
      }
    },
    getMyProfile: async function () {
      // const authId = getLocalStorageAuthIdToken()
      // self.setSnapshotNew(snapshot)
      const { data } = await API.getMyProfile()
      self.setSnapshotUpdate(data)
    },
    setAuthIdToken() {
      setLocalStorageAuthIdToken(JSON.stringify(self.id))
    },
    setLogout() {
      // self.setSnapshotNew({})
      setLocalStorageAuthTokenDelete()
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

        const snapshotUpdate = self._getSnapshotWithProperties(updatedProps)
        if (typeof snapshotUpdate === 'string') throw new Error(snapshotUpdate)

        const res = await API.setUserUpdateProfile(snapshotUpdate)
        const data = res.data
        return {
          isSuccess: true,
          data
        }
      } catch ({ message }) {
        console.log('setDatabaseUpdate():', message)
        toast.error(message)
        return {
          isSuccess: false,
          errorMessage: message
        }
      }
    },
    setDatabaseUpdateRole: async function () {
      try {
        const updatedProps = self._getMainProperties()
        const snapshotUpdate = self._getSnapshotWithProperties(updatedProps)
        if (typeof snapshotUpdate === 'string') throw new Error(snapshotUpdate)
        await API.setUserUpdateRole(snapshotUpdate)
      } catch ({ message }) {
        toast.error(message)
      }
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
    getDatabaseItems: async function () {
      const response = await API.getUsers({
        page: self.page,
        limit: self.limit,
        email: self.searchByEmail
      })

      self.setSnapshotNew(response.data, self.items)

    },
    getDatabaseItemsWhoAreStudents: async function () {
      const response = await API.getUsersWhoAreStudents({
        page: self.page,
        limit: self.limit,
        email: self.searchByEmail
      })

      self.setSnapshotNew(response.data, self.items)
    },
    getDatabaseItemsWhoAreTutors: async function () {
      const response = await API.getUsersWhoAreTutors({
        page: self.page,
        limit: self.limit,
        email: self.searchByEmail
      })

      self.setSnapshotNew(response.data, self.items)
    },
  }))

export default Users

export const defaultOfUsers = Users.create({})
