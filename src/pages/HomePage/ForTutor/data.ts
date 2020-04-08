import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import Meetings from "../../../models-one-entity/Meetings";
import Users from "../../../models-one-entity/Users";

export const TutorHomePageModel = types.compose(
  'TutorHomePageData',
  GeneralPageModel,
  types.model({
    nextMeetings: types.optional(Meetings, {}),
    topTenStudentsMessage: types.optional(Users, {}),
    topTenStudentsMeeting: types.optional(Users, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate(tutorId: number) {
      if (!tutorId) return
      self.nextMeetings.getDatabaseNextMeetingsInFuture(tutorId)
      self.topTenStudentsMessage.getDatabaseTop10StudentsMessage(tutorId)
      self.topTenStudentsMeeting.getDatabaseTop10StudentsMeeting(tutorId)
    }
  }))

const TutorHomePageData = TutorHomePageModel.create({})
export default TutorHomePageData
