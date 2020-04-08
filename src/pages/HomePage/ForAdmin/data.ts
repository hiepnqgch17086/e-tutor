import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import API from "../../../api";
import { toast } from "react-toastify";

const AdminHomePageData = types.compose(
  'AdminHomePageData',
  GeneralPageModel,
  types.model({
    totalOfStudents: types.optional(types.union(types.number, types.string), ''),
    totalOfTutors: types.optional(types.union(types.number, types.string), ''),
  })
)
  .actions(self => ({
    onDidMountDidUpdate() {
      this.getDatabaseTotalOfStudents()
      this.getDatabaseTotalOfTutors()
    },
    getDatabaseTotalOfStudents: async function () {
      try {
        const { data: { totalOfStudents, errorMessage } } = await API.getTotalOfStudents()
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfStudents })
      } catch ({ message }) {
        console.log('getTotalOfStudents()', message)
        toast.error('Something went wrong!')
      }
    },
    getDatabaseTotalOfTutors: async function () {
      try {
        const { data: { totalOfTutors, errorMessage } } = await API.getTotalOfTutors()
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotUpdate({ totalOfTutors })
      } catch ({ message }) {
        console.log('gettotalOfTutors()', message)
        toast.error('Something went wrong!')
      }
    },
  }))
  .create({})

export default AdminHomePageData
