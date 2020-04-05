import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Meeting } from "../../models-one-entity/Meetings";

const MeetingListPageData = types.compose(
  'MeetingListPageData',
  GeneralPageModel,
  types.model({
    newMeeting: types.optional(Meeting, {}),
    startDateString: types.optional(types.string, ''),
    endDateString: types.optional(types.string, ''),
  })
)
  .actions(self => ({
    onDidMountDidUpdate({
      startDateString,
      endDateString,
    }: any) {
      self.startDateString = startDateString
      self.endDateString = endDateString
      // console.log(self.startDateString, self.endDateString)
    },
    onCreateMeeting: async function (callback: Function = () => { }) {
      // console.log(self.newMeeting)
      const { errorMessage } = await self.newMeeting.setDatabaseNew()
      if (!errorMessage) callback()
    }
  }))
  .create({})

export default MeetingListPageData
