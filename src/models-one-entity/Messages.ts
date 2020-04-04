import { types } from "mobx-state-tree";
import id from "../models-one-prop/id";
import GeneralModel from "./GeneralModel";
import { User } from "./Users";
import text from "../models-one-prop/text";
import { toast } from "react-toastify";
import API from "../api";
import { RoomBase } from "./BaseModels";

export const Message = types.compose(
  'Message',
  id, GeneralModel, text,
  types.model({
    userId: types.optional(User, {}),
    roomId: types.optional(RoomBase, {})
  })
)
  .actions(self => ({
    setDatabase: async function () {
      try {
        // validate
        if (!self.text) return
        if (!self.roomId.id) throw new Error('Lack of room')

        const { roomId: room, text } = self
        const roomId = room.id

        // clear message
        self.setSnapshotNew({})
        // create message
        const { errorMessage } = await API.setMessageInRoom({
          roomId, text,
        })
        if (errorMessage) throw new Error('Something went wrong')
      } catch (error) {
        toast.error(error.message)
      }
    }
  }))


export const defaultOfMessage = Message.create({})

// const Messages = types.compose(
//   'Messages',
//   GeneralModelList,
//   types.model({
//     items
//   })
// )
