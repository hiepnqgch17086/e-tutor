import { types } from "mobx-state-tree";
import { User } from "./Users";
import { MeetingBase } from "./BaseModels";

export const Meeting = types.compose(
  'Meeting',
  MeetingBase,
  types.model({
    studentId: types.optional(User, {}),
    creatorId: types.optional(User, {}),
  }),
)
  .actions(self => ({

  }))

export const defaultOfMeeting = Meeting.create({})
