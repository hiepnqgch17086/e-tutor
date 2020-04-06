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
    onDidMountDidUpdate(id: number) {
      if (!id) return
      self.meeting.setId(id)
      self.meeting.getDatabase()
    },
    onCreateComment() {
      self.newComment.meetingId.setId(self.meeting.id)
      self.newComment.setDatabaseNew()
      // console.log(self.newComment.text)
    }
  }))
  .create({})

export default MeetingDetailPageData
