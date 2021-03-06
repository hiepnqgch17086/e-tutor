import { types, getParent } from "mobx-state-tree";
import id from "../models-one-prop/id";
import email from "../models-one-prop/email";
import password from "../models-one-prop/password";
import name from "../models-one-prop/name";
import GeneralModel from "./GeneralModel";
import { ErrorMessage, Response } from "./types";
import API from "../api";
import { setLocalStorageAuthIdToken, setLocalStorageAuthTokenDelete, getLocalStorageToken } from "../routes";
import GeneralModelList from "./GeneralModelList";
import avatar from "../models-one-prop/avatar";
import role, { IS_ADMIN, IS_TUTOR, IS_STUDENT } from "../models-one-prop/role";
import { toast } from "react-toastify";
import SettingsData from "../pages/SettingsPage/data";
export const WARNING = 'WARNING'
export const DANGEROUS = 'DANGEROUS'
export const NORMAL = 'NORMAL'

export const UserBase = types.compose(
  GeneralModel,
  id, email, password, name, avatar,
  role,
  types.model({
    totalOfMessages: types.optional(
      types.union(types.number, types.string), ''
    ),
    totalOfMessagesInNumberOfDays: types.optional(
      types.union(types.number, types.string), ''
    ),
    totalOfMeetings: types.optional(
      types.union(types.number, types.string), ''
    ),
    totalOfComments: types.optional(
      types.union(types.number, types.string), ''
    ),
    totalOfEmails: types.optional(
      types.union(types.number, types.string), ''
    ),
    totalOfMeetingFileUploads: types.optional(
      types.union(types.number, types.string), ''
    ),
    numberOfStudentsOfTutor: types.optional(
      types.union(types.number, types.string), ''
    )
  })
)
  .views(self => ({
    get statusOfSupportingStudents() {
      const { numberOfStudentsPerTutor } = SettingsData
      const { numberOfStudentsOfTutor: current } = self
      const compare = parseInt(`${numberOfStudentsPerTutor}`) - parseInt(`${current}`)
      switch (true) {
        case compare === 1:
        case compare === 2:
          return WARNING;
        case compare <= 0:
          return DANGEROUS;
        default:
          return NORMAL;
      }
    }
  }))

export const User = types.compose(
  'User',
  UserBase,
  types.model({
    tutorId: types.maybeNull(UserBase),
    // for report
  })
)
  .actions(self => ({
    getDatabase: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const { data: { user, errorMessage } } = await API.getUserProfile(self.id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(user)
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseNumberOfStudentsOfTutor: async function (tutorId: number) {
      try {
        if (!tutorId) return
        // @ts-ignore
        // eslint-disable-next-line
        const { data: { result, errorMessage } } = await API.getNumberOfStudentsOfTutor(tutorId)
        if (errorMessage) throw new Error(errorMessage)
        // console.log(result)
        self.setSnapshotUpdate({ numberOfStudentsOfTutor: result })
        // console.log('self.numberOfStudentsOfTutor', self.numberOfStudentsOfTutor)
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfMessages: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfMessages, errorMessage } } = await API.getUserTotalOfMessages(id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfMessages })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfMeetingFileUploads: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfMeetingFileUploads, errorMessage } } = await API.getUserTotalOfMeetingFileUploads(id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfMeetingFileUploads })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfMessagesInNumberOfDays: async function (numberOfDays: number) {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfMessagesInNumberOfDays, errorMessage } } = await API.getUserTotalOfMessagesInNumberOfDays(id, numberOfDays)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfMessagesInNumberOfDays })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfComments: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfComments, errorMessage } } = await API.getUserTotalOfComments(id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfComments })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfEmails: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfEmails, errorMessage } } = await API.getUserTotalOfEmails(id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfEmails })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfMeetingsOfStudent: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfMeetings, errorMessage } } = await API.getStudentTotalOfMeetings(id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfMeetings })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
    getDatabaseTotalOfMeetingsOfTutor: async function () {
      try {
        // @ts-ignore
        // eslint-disable-next-line
        const id = self.id
        const { data: { totalOfMeetings, errorMessage } } = await API.getTutorTotalOfMeetings(id)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfMeetings })
      } catch ({ message }) {
        console.log('getDatabase()', message)
        toast.error('Something went wrong!')
        return {
          errorMessage: message
        }
      }
    },
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
    getApiToken: async function (): Promise<ErrorMessage> {
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
        // validate
        const jwtToken = getLocalStorageToken()
        if (!jwtToken) return ''
        const { data: { user, errorMessage } } = await API.getMyProfile()
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate(user)
        return ''
      } catch (error) {
        return error.message
      }
    },
    setTutorNew() {
      if (!self.tutorId) {
        self.tutorId = UserBase.create({})
      }
    },
    setAuthIdToken(token: string) {
      setLocalStorageAuthIdToken(token)
    },
    setLogout() {
      // self.setSnapshotNew({})
      setLocalStorageAuthTokenDelete()
    },
    setDatabaseMyPasswordUpdate: async function (oldPassword: string | number): Promise<Response> {
      try {

        const validation = [
          self._getPasswordConstraint(),
          self._getRepeatPasswordConstraint()
        ]

        for (const constraint of validation) {
          if (constraint) throw new Error(constraint)
        }

        const { data: { errorMessage } } = await API.setMyPasswordUpdate({ oldPassword: `${oldPassword}`, newPassword: `${self.password}` })
        if (errorMessage) throw new Error(errorMessage)
        toast.success('Update successfully!')
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
    },
    setDatabaseChangeTutor: async function (callback: Function = () => { }) {
      try {
        const idOfTutor = self.tutorId ? self.tutorId.id : ''
        if (!idOfTutor) throw new Error('Tutor is required!')
        const { errorMessage } = await API.setTutorOfStudent(self.id, idOfTutor)
        if (errorMessage) throw new Error(errorMessage)

        toast.success('Update successfully')
        callback()
      } catch (error) {
        // console.log(error.message)
        toast.error(error.message)
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
    },
    setItemsToRemove(id: string | number) {
      self.items.splice(self.items.findIndex(i => i.id === id), 1)
    },
    getDbStudentUsers: async function () {
      try {
        const { data } = await API.getStudentUsers({
          emailContains: self.emailContains,
          limit: self.limit,
          page: self.page,
        })
        self.setSnapshotNew(data.students, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getDbStudentsOfTutor: async function () {
      try {
        const { data } = await API.getStudentsOfTutor({
          textContains: self.textContains,
          limit: self.limit,
          page: self.page,
        })
        self.setSnapshotNew(data.students, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getDbStudentUsersWhoHaveNotTutor: async function () {
      try {
        const { data } = await API.getStudentUsersWhoHaveNotTutor({
          emailContains: self.emailContains,
          limit: self.limit,
          page: self.page,
        })
        self.setSnapshotNew(data.students, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getDbTutorUsers: async function () {
      try {
        const { data } = await API.getTutorUsers({
          emailContains: self.emailContains,
          limit: self.limit,
          page: self.page,
        })
        self.setSnapshotNew(data.tutors, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getDatabaseTop10StudentsMessage: async function (tutorId: number) {
      try {
        const { data: { students }, errorMessage } = await API.getTop10StudentsMessageToThisTutor(tutorId)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(students, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getDatabaseTop10StudentsMeeting: async function (tutorId: number) {
      try {
        const { data: { students }, errorMessage } = await API.getTop10StudentsMeetingToThisTutor(tutorId)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(students, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getDatabaseStudentsNotInteractive: async function (numberOfDays: number) {
      try {
        const { data: { studentsWhoNotInteractive }, errorMessage } = await API.getStudentNotInteractive({
          textContains: self.textContains,
          limit: self.limit,
          page: self.page,
          numberOfDays,
        })
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(studentsWhoNotInteractive, self.items)
        // console.log(getSnapshot(self.items))
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }

    }
  }))

export default Users

export const defaultOfUsers = Users.create({})
