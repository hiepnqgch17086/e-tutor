import { types } from "mobx-state-tree";
import GeneralPageModel from "../../GeneralPageModel";
import Meetings from "../../../models-one-entity/Meetings";
import Users from "../../../models-one-entity/Users";

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
    onDidMountDidUpdate() {
      self.nextMeetings.getDatabaseNextMeetingsInFuture()
      self.topTenStudentsMessage.getDatabaseTop10StudentsMessage()
      self.topTenStudentsMeeting.getDatabaseTop10StudentsMeeting()
    }
  }))
  .create({})

export default TutorHomePageData
