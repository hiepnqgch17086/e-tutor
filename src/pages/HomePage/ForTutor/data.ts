import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import Meetings from "../../../models-one-entity/Meetings";
import Users, { User } from "../../../models-one-entity/Users";

export const TutorHomePageModel = types.compose(
  'TutorHomePageData',
  GeneralPageModel,
  types.model({
    nextMeetings: types.optional(Meetings, {}),
    tutor: types.optional(User, {}),
    topTenStudentsMessage: types.optional(Users, {}),
    topTenStudentsMeeting: types.optional(Users, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate(tutorId: number) {
      if (!tutorId) return
      const { tutor } = self
      tutor.setId(tutorId)
      tutor.getDatabaseTotalOfMessages()
      tutor.getDatabaseTotalOfMeetingsOfTutor()
      tutor.getDatabaseTotalOfComments()
      tutor.getDatabaseTotalOfEmails()
      tutor.getDatabaseTotalOfMessagesInNumberOfDays(7)
      tutor.getDatabaseTotalOfMeetingFileUploads()

      self.nextMeetings.getDatabaseNextMeetingsInFuture(tutorId)
      self.topTenStudentsMessage.getDatabaseTop10StudentsMessage(tutorId)
      self.topTenStudentsMeeting.getDatabaseTop10StudentsMeeting(tutorId)
    }
  }))

const TutorHomePageData = TutorHomePageModel.create({})
export default TutorHomePageData
