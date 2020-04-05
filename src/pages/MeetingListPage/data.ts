import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Meetings, { Meeting } from "../../models-one-entity/Meetings";

const MeetingListPageData = types.compose(
  'MeetingListPageData',
  GeneralPageModel,
  types.model({
    newMeeting: types.optional(Meeting, {}),
    meetings: types.optional(Meetings, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate({
      fromAt,
      toAt,
    }: any) {
      const { meetings } = self
      meetings.setFromAt(fromAt)
      meetings.setToAt(toAt)
      meetings.getDatabaseItems()
    },
    onCreateMeeting: async function (callback: Function = () => { }) {
      // console.log(self.newMeeting)
      const { errorMessage } = await self.newMeeting.setDatabaseNew()
      if (!errorMessage) callback()
    }
  }))
  .create({})

export default MeetingListPageData
