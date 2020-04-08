import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import Meetings from "../../../models-one-entity/Meetings";
import Users from "../../../models-one-entity/Users";
import ProfilePageData from "../../ProfilePage/data";

const TutorHomePageData = types.compose(
  'TutorHomePageDate',
  GeneralPageModel,
  types.model({
    nextMeetings: types.optional(Meetings, {}),
    topTenStudentsMessage: types.optional(Users, {}),
    topTenStudentsMeeting: types.optional(Users, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate(tutorId: number = ProfilePageData.currentUser.id) {
      self.nextMeetings.getDatabaseNextMeetingsInFuture(tutorId)
      self.topTenStudentsMessage.getDatabaseTop10StudentsMessage(tutorId)
      self.topTenStudentsMeeting.getDatabaseTop10StudentsMeeting(tutorId)
    }
  }))
  .create({})

export default TutorHomePageData
