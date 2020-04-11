import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import API from "../../../api";
import { toast } from "react-toastify";
import Users from "../../../models-one-entity/Users";

const AdminHomePageData = types.compose(
  'AdminHomePageData',
  GeneralPageModel,
  types.model({
    totalOfStudents: types.optional(types.union(types.number, types.string), ''),
    totalOfTutors: types.optional(types.union(types.number, types.string), ''),
    studentsNotInteractive: types.optional(Users, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate(numberOfDays: number) {
      this.getDatabaseTotalOfStudents()
      this.getDatabaseTotalOfTutors()
      this.getDatabaseStudentsNotInteractive(numberOfDays)
    },
    getDatabaseStudentsNotInteractive(numberOfDays: number) {
      self.studentsNotInteractive.getDatabaseStudentsNotInteractive(numberOfDays)
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
