import { types } from "mobx-state-tree";
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
import { setLocalStorageAuthToken } from "../routes";
import GeneralModelList from "./GeneralModelList";
import permission from "../models-one-prop/permission";

export const IS_ADMIN = '1'
export const IS_TUTOR = '2'
export const IS_STUDENT = '3'

const UserProps = types.compose(
  id, email, password, name, dob, gender, phone, address,
  repeatPassword,
)

export const User = types.compose(
  'User',
  UserProps,
  GeneralModel,
  types.model({
    permissions: types.array(permission)
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
        const response = await API.get('/users/1')
        const data = response.data
        setLocalStorageAuthToken(JSON.stringify(data))
        return ''
      } catch (error) {
        console.log(error.message)
        return 'Something went wrong!'
      }
    },
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
