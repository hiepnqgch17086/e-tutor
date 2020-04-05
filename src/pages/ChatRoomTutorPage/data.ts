import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Rooms from "../../models-one-entity/Rooms";
import { Message } from "../../models-one-entity/Messages";

const ChatRoomTutorPage = types.compose(
  'ChatRoomStudentPage',
  GeneralPageModel,
  types.model({
    rooms: types.optional(Rooms, {}),
    newMessage: types.optional(Message, {})
  })
)
  .actions(self => ({
    onDidMountDidUpdate() {
      self.rooms.getDatabaseRoomsOfTutorAuth()
    },
    onCreateMessage() {
      // console.log(self.newMessage)
      // const { newMessage } = self
      // newMessage.roomId.setId(self.room.id)
      // newMessage.setDatabase()
      // self.newMessage.setSnapshotNew()
    }
  }))
  .create({})

export default ChatRoomTutorPage
