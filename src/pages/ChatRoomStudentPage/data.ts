import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Room } from "../../models-one-entity/Rooms";
import { Message } from "../../models-one-entity/Messages";

const ChatRoomStudentPage = types.compose(
  'ChatRoomStudentPage',
  GeneralPageModel,
  types.model({
    room: types.optional(Room, {}),
    newMessage: types.optional(Message, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate() {
      self.room.getDatabaseMessagesStudentAuth()
    },
    onCreateMessage() {
      // console.log(self.newMessage)
      const { newMessage } = self
      newMessage.roomId.setId(self.room.id)
      newMessage.setDatabase()
      // self.newMessage.setSnapshotNew()
    }
  }))
  .create({})

export default ChatRoomStudentPage
