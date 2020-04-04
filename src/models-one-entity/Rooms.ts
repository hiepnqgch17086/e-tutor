import { types } from "mobx-state-tree";
import { Message } from './Messages'
import API from "../api";
import { RoomBase } from "./BaseModels";

export const Room = types.compose(
  'Room', RoomBase,
  types.model({
    messages: types.array(Message)
  })
)
  .actions(self => ({
    setMessageAdded(message: object) {
      const msg = Message.create(message)
      self.messages.push(msg)
    },
    getDatabaseStudentAuth: async function () {
      try {
        const { data, errorMessage } = await API.getRoomOfStudentAuth()
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(data)
        // console.log(self)
      } catch (error) {
        console.log(error.messages)
      }
    }
  }))

export const defaultOfRoom = Room.create({})
