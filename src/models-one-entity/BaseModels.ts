import { types } from "mobx-state-tree";
import GeneralModel from "./GeneralModel";
import id from "../models-one-prop/id";
import { User } from "./Users";

export const RoomBase = types.compose(
  'RoomBase', id, GeneralModel,
  types.model({
    studentId: types.optional(User, {}),
  })
)
