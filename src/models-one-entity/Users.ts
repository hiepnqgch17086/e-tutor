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
import { ErrorMessage } from "./types";
import API from "../api";
import { setLocalStorageAuthToken, getLocalStorageAuthToken } from "../routes";
import GeneralModelList from "./GeneralModelList";
// import permission from "../models-one-prop/permission";

export const IS_ADMIN = '1'
export const IS_TUTOR = '2'
export const IS_STUDENT = '3'

const UserPermission = types.model({
  userId: types.optional(types.string, ''),
  permissionId: types.optional(types.string, ''),
})
  .actions(self => ({

  }))

const UserProps = types.compose(
  id, email, password, name, dob, gender, phone, address,
  repeatPassword,
)

export const User = types.compose(
  'User',
  UserProps,
  GeneralModel,
  types.model({
    userPermissions: types.map(UserPermission)
  })
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainProperties(): Array<string> {
      return ['email', 'password', 'name', 'dob', 'gender', 'phone', 'address']
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
    /**
     * Login
     */
    getDatabaseToken: async function (): Promise<ErrorMessage> {
      try {
        // will change later
        const response = await API.get('/users/u1')
        const response2 = await API.get('/userPermissions/?userId=u1')

        const data = response.data
        // data.permissions = permissions
        self.setSnapshotNew(data)
        // console.log(JSON.stringify(data))
        // @ts-ignore
        response2.data.map(item => {
          // @ts-ignore
          self.setUserPermissionItem(item.permissionId)
          return item
        })

        // @ts-ignore
        self.setLocal()
        return ''
      } catch (error) {
        console.log(error.message)
        return 'Something went wrong!'
      }
    },
    setUserPermissionItem(permissionId: string) {
      // console.log('permissionId', permissionId)
      self.userPermissions.set(permissionId,
        UserPermission.create({ permissionId })
      )
    },
    setLocal() {
      setLocalStorageAuthToken(JSON.stringify(getSnapshot(self)))
    },
    getLocal() {
      const snapshot = getLocalStorageAuthToken()
      self.setSnapshotNew(snapshot)
    }
  }))

const Users = types.compose(
  'Users',
  GeneralModelList,
  types.model({
    items: types.map(User)
  })
)
  .actions(self => ({

  }))

export default Users
