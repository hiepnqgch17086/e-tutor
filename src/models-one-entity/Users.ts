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
import { setLocalStorageAuthToken, getLocalStorageAuthToken } from "../routes";
import GeneralModelList from "./GeneralModelList";
import avatar from "../models-one-prop/avatar";
import role from "../models-one-prop/role";
// import permission from "../models-one-prop/permission";
const defaultSnapshot = {}

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
    _getMainProperties(): Array<string> {
      return ['email', 'password', 'name', 'dob', 'gender', 'phone', 'address', 'avatar']
    },
    /**
     * @override
     */
    _getReference(): string {
      // if new, consider like /users/
      return `/users/${self.id}`
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
    setDatabaseUpdateProfile: async function (snapshot: object = defaultSnapshot): Promise<Response> {
      /**
       * if snapshot, update with snapshot, else update with self
       */
      try {
        let propertiesUpdated: any
        if (snapshot !== defaultSnapshot) {
          const errorMessage = self.setSnapshotUpdate(snapshot)
          if (errorMessage) throw new Error(errorMessage)
          propertiesUpdated = Object.keys(snapshot)
        }
        // validate
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

        //@ts-ignore, reference to this._getMainProperties()
        const updatedProps = propertiesUpdated ? [...propertiesUpdated] : [...self._getMainProperties()]
        const snapshotUpdate = self._getProperties(updatedProps)
        if (typeof snapshotUpdate === 'string') throw new Error(snapshotUpdate)

        // @ts-ignore, reference to this._getReference()
        const url = self._getReference()
        const res = await API.put(url, snapshotUpdate)
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
        const response = await API.get('/users/u1')

        const data = response.data
        // console.log(data)
        // data.permissions = permissions
        self.setSnapshotUpdate(data)

        // @ts-ignore
        self.setLocal()
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
    getDatabaseItems: async function () {
      const response = await API.get('/users')
      self.setSnapshotNew(response.data, self.items)
    }
  }))

export default Users

export const defaultOfUsers = Users.create({})
