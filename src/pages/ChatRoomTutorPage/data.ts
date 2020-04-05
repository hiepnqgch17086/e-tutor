import { types, getSnapshot } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Rooms, { Room } from "../../models-one-entity/Rooms";
import { Message } from "../../models-one-entity/Messages";

const ChatRoomTutorPageData = types.compose(
  'ChatRoomStudentPage',
  GeneralPageModel,
  types.model({
    rooms: types.optional(Rooms, {}),
    activedRoom: types.optional(Room, {}),
    newMessage: types.optional(Message, {}),
  })
)
  .actions(self => ({
    onDidMountDidUpdate() {
      self.rooms.getDatabaseRoomsOfTutorAuth()
    },
    onChooseRoom(id: number) {
      const filtered = self.rooms.items.find(item => item.id === id)
      if (!filtered) return
      self.activedRoom.setSnapshotNew(getSnapshot(filtered))
      // get message
      self.activedRoom.getDatabaseMessagesInRoom()
    },
    onCreateMessage() {
      const { newMessage } = self
      newMessage.roomId.setId(self.activedRoom.id)
      newMessage.setDatabase()
    }
  }))
  .create({})

export default ChatRoomTutorPageData
