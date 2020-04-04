import { types, getSnapshot } from "mobx-state-tree";
import id from "../models-one-prop/id";
import title from "../models-one-prop/title";
import body from "../models-one-prop/body";
import GeneralModel from "./GeneralModel";
import PaginationModel from "./PaginationModel";
import API from "../api";
import { User } from "./Users";
import GeneralModelList from "./GeneralModelList";
import isRead from "../models-one-prop/isRead";
import { toast } from "react-toastify";

export const Email = types.compose(
  'Email',
  id, title, body, isRead,
  GeneralModel,
  types.model({
    userId: types.optional(User, {})
  }),
)
  .actions(self => ({
    getDatabase: async function () {
      try {
        const { data, errorMessage } = await API.getEmail(self.id)
        if (errorMessage) throw new Error(errorMessage)
        // console.log('self')
        self.setSnapshotNew(data)
        // console.log(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
  }))
  .views(self => ({
    get bodyDisplay(): string {
      let rs = self.body.replace(/^(.{50}[^\s]*).*/, "$1")
      if (self.body.length > rs.length) rs += '...'
      return rs
    }
  }))

const Emails = types.compose(
  PaginationModel,
  GeneralModelList,
  types.model({
    items: types.array(Email)
  })
)
  .actions(self => ({
    getDatabaseUnReadEmailsOfAuth: async function () {
      try {
        const { errorMessage, data } = await API.getUnReadEmailsOfAuth()
        if (errorMessage) throw new Error(errorMessage)

        self.setSnapshotNew(data, self.items)
        // console.log(getSnapshot(self))
      } catch (error) {
        console.log(error.message)
      }
    },
    getDatabaseAuthEmails: async function () {
      try {
        const { data, errorMessage } = await API.getEmailsOfAuth({ limit: self.limit, page: self.page })
        if (errorMessage) throw new Error(errorMessage)

        self.setSnapshotNew(data, self.items)
      } catch (error) {
        toast.error(error.message)
      }
    },
    setItemsToAdd(snapshot: Object) {
      const email = Email.create(snapshot)
      self.items.push(email)
      // console.log(getSnapshot(self.items))
    },
    setItemsToRemove(id: number) {
      self.items.splice(self.items.findIndex(i => i.id === id), 1)
      // console.log(getSnapshot(self.items))
    },
  }))
  .views(self => ({
    get countOfUnReadEmails(): number {
      let count = 0
      self.items.map(email => {
        if (!email.isRead) count++
      })
      return count
    }
  }))

export const defaultOfEmail = Email.create({})
export const defaultOfEmails = Emails.create({})
export default Emails
