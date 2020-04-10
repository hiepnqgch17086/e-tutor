import { types, getSnapshot } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Rooms, { Room } from "../../models-one-entity/Rooms";
import { Message } from "../../models-one-entity/Messages";
import useSubscribeMessageOfOneRoom from "../../hooks/useSubscribeMessageOfOneRoom";
import ProfilePageData from "../ProfilePage/data";


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
    },
    ListOfMessage_onDidMountDidUpDate() {
      const { setSubscribeMessage, setUnSubscribeMessage } = useSubscribeMessageOfOneRoom({
        roomId: ChatRoomTutorPageData.activedRoom.id,// .activedRoom.id,
        setMessageCreated: (message: any) => {
          // update: is seen by partner, if not auth
          const isAuth = message.userId.id === ProfilePageData.currentUser.id
          if (!isAuth) {
            // update comment, isSeenByPartner = true
            message.isSeenByPartner = true
            const messageNode = Message.create(message)
            messageNode.setDatabaseUpdateStatus_isSeenByPartner_true()
          }
          ChatRoomTutorPageData.activedRoom.setMessageAdded(message)
        },
        setMessageUpdated_isSeenByPartner_true: (message: any) => {
          self.activedRoom.setMessageUpdated(message)
        }
      })
      setUnSubscribeMessage()
      setSubscribeMessage()
    },
    ListOfMessage_onWillUnMount() {
      const { setUnSubscribeMessage } = useSubscribeMessageOfOneRoom({
        roomId: ChatRoomTutorPageData.activedRoom.id,// .activedRoom.id,
        setMessageCreated: ChatRoomTutorPageData.activedRoom.setMessageAdded
      })
      setUnSubscribeMessage()
    }
  }))
  .create({})

export default ChatRoomTutorPageData
