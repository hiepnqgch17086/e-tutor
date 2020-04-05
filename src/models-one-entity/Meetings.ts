import { types } from "mobx-state-tree";
import { User } from "./Users";
import { MeetingBase } from "./BaseModels";
import API from "../api";

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
