import { types } from "mobx-state-tree";
import id from "../models-one-prop/id";
import text from "../models-one-prop/text";
import GeneralModel from "./GeneralModel";
import { User } from "./Users";
import { MeetingBase } from './BaseModels'

export const Comment = types.compose(
  'Comment',
  GeneralModel,
  id,
  types.model({
    userId: types.optional(User, {}),
    meetingId: types.optional(MeetingBase, {})
  }),
  text,
)

export const defaultOfComment = Comment.create({})
