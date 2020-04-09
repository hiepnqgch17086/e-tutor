import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Meetings, { Meeting } from "../../models-one-entity/Meetings";
import getSubscribeMeetingMethods from "../../subscribes/getSubscribeMeetingMethods";

let meetingSubscription: ZenObservable.Subscription | null = null

const { setSubscribeMeeting, setUnSubscribeMeeting } = getSubscribeMeetingMethods({
  querySubscription: meetingSubscription,
  setMeetingCreated: (meeting) => {
    MeetingListPageData.meetings.setMeetingAddedInCalendar(meeting)
  },
  setMeetingUpdated: (meeting) => {
    MeetingListPageData.meetings.setMeetingUpdateStartAtEndAt(meeting)
  },
  setQuerySubscription: (sub) => meetingSubscription = sub,
})

const MeetingListPageData = types.compose(
  'MeetingListPageData',
  GeneralPageModel,
  types.model({
    newMeeting: types.optional(Meeting, {}),
    meetings: types.optional(Meetings, {}),
    meetingsByPagination: types.optional(Meetings, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate({
      fromAt,
      toAt,
    }: any) {
      const { meetings, meetingsByPagination } = self
      meetings.setFromAt(fromAt)
      meetings.setToAt(toAt)
      meetings.getDatabaseItems()

      meetingsByPagination.getDatabaseItemsByPagination()
    },
    onCreateMeeting: async function (callback: Function = () => { }) {
      // console.log(self.newMeeting)
      const { errorMessage } = await self.newMeeting.setDatabaseNew()
      if (!errorMessage) callback()
    },
    // for table of meetings pagination
    onTitleSearchChange() {
      self.meetingsByPagination.getDatabaseItemsByPagination()
    },
    onPageChange() {
      self.meetingsByPagination.getDatabaseItemsByPagination()
    },
    // COMPONENT-One: ListOfMeeting
    setComponent_ListOfMeeting_onDidMountDidUpdate() {
      setUnSubscribeMeeting()
      setSubscribeMeeting()
    },
    setComponent_ListOfMeeting_onWillUnMount() {
      setUnSubscribeMeeting()
    }
  }))
  .create({})

export default MeetingListPageData
