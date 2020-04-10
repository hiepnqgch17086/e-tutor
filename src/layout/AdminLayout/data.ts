import { types } from "mobx-state-tree";
import GeneralPageModel from "../../pages/GeneralPageModel";
import API from "../../api";
import { toast } from "react-toastify";
import getSubscribeMeetingMethods from "../../subscribes/getSubscribeMeetingMethods";
import moment from "moment";

let meetingSubscription: ZenObservable.Subscription | null = null

const subs = getSubscribeMeetingMethods({
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

const AdminLayoutData = types.compose(
  'AdminLayoutData',
  GeneralPageModel,
  types.model({
    numberOfMeetingsToday: types.optional(types.union(types.number, types.string), ''),
    numberOfLastMessagesIsNotSeenByAuth: types.optional(types.union(types.number, types.string), ''),
  })
)
  .actions(self => ({
    NumberOfMeetingsToday_onDidMountDidUpdate: async function () {
      // subs
      subs.setUnSubscribeMeeting()
      subs.setSubscribeMeeting()
      // console.log('sss')
      this.getDatabaseNumberOfMeetingsToday()
    },
    NumberOfMeetingsToday_onWillUnMount() {
      self.setSnapshotUpdate({ numberOfMeetingsToday: '' })
      subs.setUnSubscribeMeeting()
    },
    NumberOfLastMessagesIsNotSeenByAuth_onDidMountDidUpdate: async function () {
      this.getDatabaseNumberOfLastMessagesIsNotSeenByAuth()
    },
    NumberOfLastMessagesIsNotSeenByAuth_onWillUnMount: async function () {

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
        // console.log('numberOfMeetingsToday', numberOfMeetingsToday)
        self.setSnapshotUpdate({ numberOfMeetingsToday })
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }
    }
  }))
  .create({})

export default AdminLayoutData
