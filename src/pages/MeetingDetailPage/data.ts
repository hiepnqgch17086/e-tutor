import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Meeting } from "../../models-one-entity/Meetings";
import { Comment } from "../../models-one-entity/Comments";

const MeetingDetailPageData = types.compose(
  'MeetingDetailPageData',
  GeneralPageModel,
  types.model({
    meeting: types.optional(Meeting, {}),
    newComment: types.optional(Comment, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate(id: number, callback: Function = () => { }) {
      if (!id) return
      self.meeting.setId(id)
      self.meeting.getDatabase()
      callback()
    },
    onCreateComment() {
      self.newComment.meetingId.setId(self.meeting.id)
      self.newComment.setDatabaseNew()
      // console.log(self.newComment.text)
    },
    onForcusInputComment() {
      // set Is On
      // const { currentUser: { role } } = ProfilePageData
      // const { meeting } = self
      // if (role === IS_TUTOR && !meeting.isCreatorOn) {
      //   meeting.setDatabaseUpdateIsOnOrOff(true)
      //   return
      // }
      // if (role === IS_STUDENT && !meeting.isStudentOn) {
      //   meeting.setDatabaseUpdateIsOnOrOff(true)
      //   return
      // }
    },
    onCloseTabOrBrowser() {
      // set is Off
      return self.meeting.setDatabaseUpdateIsOnOrOff()
      // if (role === IS_TUTOR && !meeting.isCreatorOn) {
      //   return
      // }
      // if (role === IS_STUDENT && !meeting.isStudentOn) {
      //   self.meeting.setDatabaseUpdateIsOnOrOff(true)
      //   return
      // }
    }
  }))
  .create({})

export default MeetingDetailPageData
