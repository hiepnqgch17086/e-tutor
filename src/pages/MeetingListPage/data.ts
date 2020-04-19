import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Meetings, { Meeting } from "../../models-one-entity/Meetings";
import getSubscribeMeetingMethods from "../../subscribes/getSubscribeMeetingMethods";
import { toast } from "react-toastify";

let meetingSubscription: ZenObservable.Subscription | null = null

const { setSubscribeMeeting, setUnSubscribeMeeting } = getSubscribeMeetingMethods({
  querySubscription: meetingSubscription,
  setMeetingCreated: (meeting) => {
    MeetingListPageData.meetings.setMeetingAddedInCalendar(meeting)
  },
  setMeetingUpdated: (meeting) => {
    MeetingListPageData.meetings.setMeetingUpdateStartAtEndAtTitle(meeting)
  },
  setMeetingDeleted: (meeting, previousValues) => {
    // console.log(previousValues)
    // @ts-ignore
    MeetingListPageData.meetings.setMeetingRemove(previousValues.id)
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
      if (!errorMessage) {
        toast.success('Add meeting successfully!')
        callback()
      }
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
