import { types } from "mobx-state-tree";
import GeneralPageModel from "../../pages/GeneralPageModel";
import API from "../../api";
import { toast } from "react-toastify";
import getSubscribeMeetingMethods from "../../subscribes/getSubscribeMeetingMethods";
import moment from "moment";
import getSubscribeMessageToOrCreatedByUser from "../../subscribes/getSubscribeMessageToOrCreatedByUser";
import ProfilePageData from "../../pages/ProfilePage/data";

let meetingSubscription: ZenObservable.Subscription | null = null

const subsOfMeeting = getSubscribeMeetingMethods({
  querySubscription: meetingSubscription,
  setMeetingCreated: (meeting) => {
    const startOfTodayStr = moment().startOf('day').toISOString()
    const endOfTodayStr = moment().endOf('day').toISOString()
    // @ts-ignore
    const meetingStartAt = meeting.startAt
    if (startOfTodayStr <= meetingStartAt && meetingStartAt <= endOfTodayStr) {
      AdminLayoutData.getDatabaseNumberOfMeetingsToday()
    }
  },
  setMeetingUpdated: (meeting, previousValues) => {
    const startOfTodayStr = moment().startOf('day').toISOString()
    const endOfTodayStr = moment().endOf('day').toISOString()
    // @ts-ignore
    const meetingStartAt = meeting.startAt
    // @ts-ignore
    const prevMeetingStartAt = previousValues.startAt
    if (startOfTodayStr <= meetingStartAt && meetingStartAt <= endOfTodayStr) {
      AdminLayoutData.getDatabaseNumberOfMeetingsToday()
      return
    }
    if (startOfTodayStr <= prevMeetingStartAt && prevMeetingStartAt <= endOfTodayStr) {
      AdminLayoutData.getDatabaseNumberOfMeetingsToday()
      return
    }
  },
  setQuerySubscription: (sub) => meetingSubscription = sub
})

// const subsOfMessage = getSubscribeMessageToOrCreatedByUser({
//   setMessageCreated: (message: any) => {
//     if (message.userId.id !== ProfilePageData.currentUser.id) {
//       AdminLayoutData.getDatabaseNumberOfLastMessagesIsNotSeenByAuth()
//     }
//   }
// })

const AdminLayoutData = types.compose(
  'AdminLayoutData',
  GeneralPageModel,
  types.model({
    numberOfMeetingsToday: types.optional(types.union(types.number, types.string), ''),
    numberOfLastMessagesIsNotSeenByAuth: types.optional(types.union(types.number, types.string), ''),
    preventUpdateNumberOfLastMessagesIsNotSeenByAuth: types.optional(types.boolean, false)
  })
)
  .actions(self => ({
    NumberOfMeetingsToday_onDidMountDidUpdate: async function () {
      // subs
      subsOfMeeting.setUnSubscribeMeeting()
      subsOfMeeting.setSubscribeMeeting()
      // console.log('sss')
      this.getDatabaseNumberOfMeetingsToday()
    },
    NumberOfMeetingsToday_onWillUnMount() {
      self.setSnapshotUpdate({ numberOfMeetingsToday: '' })
      subsOfMeeting.setUnSubscribeMeeting()
    },
    NumberOfLastMessagesIsNotSeenByAuth_onDidMountDidUpdate: async function () {
      // subsOfMessage.setUnSubscribeMessageToOrCreatedByUser()
      // subsOfMessage.setSubscribeMessageToOrCreatedByUser()
      this.getDatabaseNumberOfLastMessagesIsNotSeenByAuth()
    },
    NumberOfLastMessagesIsNotSeenByAuth_onWillUnMount: async function () {
      // subsOfMessage.setUnSubscribeMessageToOrCreatedByUser()
    },
    getDatabaseNumberOfLastMessagesIsNotSeenByAuth: async function () {
      try {
        // get db
        const {
          data: { numberOfLastMessagesIsNotSeenByAuth },
          errorMessage
        } = await API.getNumberOfLastMessagesIsNotSeenByAuth()
        if (errorMessage) throw new Error(errorMessage)
        // console.log('numberOfLastMessagesIsNotSeenByAuth', numberOfLastMessagesIsNotSeenByAuth)
        self.setSnapshotUpdate({ numberOfLastMessagesIsNotSeenByAuth })
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }
    },
    getDatabaseNumberOfMeetingsToday: async function () {
      try {
        // get db
        const {
          data: { numberOfMeetingsToday },
          errorMessage
        } = await API.getNumberOfMeetingsToday()
        if (errorMessage) throw new Error(errorMessage)
        console.log('numberOfMeetingsToday', numberOfMeetingsToday)
        self.setSnapshotUpdate({ numberOfMeetingsToday })
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }
    }
  }))
  .create({})

export default AdminLayoutData
