import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Meeting } from "../../models-one-entity/Meetings";

const MeetingDetailPageData = types.compose(
  'MeetingDetailPageData',
  GeneralPageModel,
  types.model({
    meeting: types.optional(Meeting, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate(id: number) {
      if (!id) return
      self.meeting.setId(id)
      self.meeting.getDatabase()
    },
  }))
  .create({})

export default MeetingDetailPageData
