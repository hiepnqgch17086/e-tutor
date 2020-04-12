import { types } from "mobx-state-tree";
import GeneralModel from "./GeneralModel";
import id from "../models-one-prop/id";
import { User } from "./Users";
import title from "../models-one-prop/title";
import { endAt, startAt } from "../models-one-prop/dateAt";

export const RoomBase = types.compose(
  'RoomBase', id, GeneralModel,
  types.model({
    studentId: types.optional(User, {}),
  })
)

export const MeetingBase = types.compose(
  'MeetingBase',
  id, GeneralModel,
  title, //isCreatorOn, isStudentOn, isCreatorTyping, isStudentTyping,
  startAt, endAt
)
