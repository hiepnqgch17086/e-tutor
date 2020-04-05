import { types, clone } from "mobx-state-tree";
import { Message } from './Messages'
import API from "../api";
import { RoomBase } from "./BaseModels";
import GeneralModelList from "./GeneralModelList";

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
    getDatabaseMessagesStudentAuth: async function () {
      try {
        const { data, errorMessage } = await API.getRoomMessagesOfStudentAuth()
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(data)
        // console.log(self)
      } catch (error) {
        console.log(error.messages)
      }
    },
    getDatabaseMessagesInRoom: async function () {
      try {
        const roomId = self.id
        const { data, errorMessage } = await API.getMessagesInRoom({
          roomId
        })
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(data.messages, self.messages)
        // console.log(data)
      } catch (error) {
        console.log(error.messages)
      }
    },
    getShouldHideAvatarAndNameOfMessage(index: number) {
      let rs = false
      const currentMesssage = self.messages[index]
      const nextMessage = self.messages[index + 1]
      if (currentMesssage && nextMessage) {
        if (currentMesssage.userId.id === nextMessage.userId.id) rs = true
      }
      return rs
    }
  }))

export const defaultOfRoom = Room.create({})

const Rooms = types.compose(
  'Rooms', GeneralModelList,
  types.model({
    items: types.array(Room)
  })
)
  .actions(self => ({
    getDatabaseRoomsOfTutorAuth: async function () {
      try {
        const { data, errorMessage } = await API.getRoomsOfTutorAuth(self.textContains)
        if (errorMessage) throw new Error(errorMessage)
        self.setSnapshotNew(data, self.items)
      } catch (error) {
        console.log(error.messages)
      }
    },
    setLatestMessageOfRoom(message: object) {
      const msg = Message.create(message)
      // remove room
      let idx: number = -1
      const msgRoom = self.items.find((item, index) => {
        const rs = item.id === msg.roomId.id
        if (rs) idx = index
        return rs
      })
      // validate msgRoom
      if (!msgRoom) return
      // update latest message to clone
      const cloneMsgRoom = clone(msgRoom)
      cloneMsgRoom.setSnapshotNew([msg], cloneMsgRoom.messages)
      // move to the first
      self.items.splice(idx, 1)
      self.items.unshift(cloneMsgRoom)
    }
  }))

export const defaultOfRooms = Rooms.create({})
export default Rooms
