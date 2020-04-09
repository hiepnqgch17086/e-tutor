import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import { User } from "../../../models-one-entity/Users";
import Meetings from "../../../models-one-entity/Meetings";

export const StudentHomePageModel = types.compose(
  'StudentHomePageModel',
  GeneralPageModel,
  types.model({
    student: types.optional(User, {}),
    nextMeetings: types.optional(Meetings, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate(studentId: number) {
      if (!studentId) return
      const { student } = self
      student.setId(studentId)
      student.getDatabaseTotalOfMessages()
      student.getDatabaseTotalOfMessagesInNumberOfDays(7)
      student.getDatabaseTotalOfMeetingsOfStudent()
      student.getDatabaseTotalOfComments()
      student.getDatabaseTotalOfEmails()

      self.nextMeetings.getDatabaseNextMeetingsInFuture(studentId)
    }
  }))

const StudentHomePageData = StudentHomePageModel.create({})

export default StudentHomePageData

