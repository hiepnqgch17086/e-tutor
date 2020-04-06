import { types } from "mobx-state-tree";
import { User } from "./Users";
import { MeetingBase } from "./BaseModels";
import API from "../api";
import GeneralModelList from "./GeneralModelList";
import moment from "moment";

export const Meeting = types.compose(
  'Meeting',
  MeetingBase,
  types.model({
    studentId: types.optional(User, {}),
    creatorId: types.optional(User, {}),
  }),
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainProperties(): Array<string> {
      return ['title', 'studentId', 'startAt', 'endAt']
    },
    /**
     * @override
     */
    _getValidation(): Array<string> {
      const constraintOther = self.startAt > self.endAt
        ? 'Start at should be smaller than End at'
        : ''
      const constraintOther2 = self.studentId.id ? '' : 'Student is required!'
      return [
        self._getTitleConstraint(),
        self._getStartAtConstraint(),
        self._getEndAtConstraint(),
        constraintOther,
        constraintOther2
      ]
    },
    _getMainThreadOfSettingDatabaseNew: async function (snapshot: object) {
      return API.setMeetingNew(snapshot)
    }
  }))

export const defaultOfMeeting = Meeting.create({})

const Meetings = types.compose(
  'Meetings',
  GeneralModelList,
  types.model({
    items: types.array(Meeting),
    fromAt: types.optional(types.string, ''),
    toAt: types.optional(types.string, ''),
  })
)
  .actions(self => ({
    setMeetingAdded(meeting: object) {
      const newMeeting = Meeting.create(meeting)
      self.items.push(newMeeting)
    },
    setFromAt(newV: string) {
      self.fromAt = newV
    },
    setToAt(newV: string) {
      self.toAt = newV
    },
    getDatabaseItems: async function () {
      try {
        const fromAt = self.fromAt
        const toAt = self.toAt
        const { data: { meetings }, errorMessage } = await API.getMeetings({ fromAt, toAt })
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(meetings, self.items)
      } catch (error) {
        console.log(error.message)
      }
    },
    getMeetingListInfoInADay(anyDateString: string) {
      const format1 = moment(anyDateString).format('YYYY-MM-DD')
      let count: number = 0
      const meetingsInDay = self.items.filter(item => {
        const format2 = moment(item.startAt).format('YYYY-MM-DD')
        const format3 = moment(item.endAt).format('YYYY-MM-DD')
        if (format1 === format2 || format1 === format3) {
          count += 1
          return true
        }
        return false
      })
      return { count, meetingsInDay }
    }
  }))

export default Meetings
export const defaultOfMeetings = Meetings.create({})