import { types, getSnapshot } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import Rooms, { Room } from "../../models-one-entity/Rooms";
import { Message } from "../../models-one-entity/Messages";
import useSubscribeMessageOfOneRoom from "../../hooks/useSubscribeMessageOfOneRoom";
// import AdminLayoutData from "../../layout/AdminLayout/data";


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
      // effect: clear and turn off listener of unread message
      // subsOfLastMessagesIsNotSeenByAuth.setUnSubscribeMessageToOrCreatedByUser()
      // if (AdminLayoutData.numberOfLastMessagesIsNotSeenByAuth) {
      //   // check if, not only for check, but also for rename attribute
      //   AdminLayoutData.setSnapshotUpdate({
      //     numberOfLastMessagesIsNotSeenByAuth: 0,
      //   })
      //   // 
      // }
    },
    onWillUnMount() {
      self.setSnapshotNew({})
      // // effect: get and turn on listener of unread message
      // AdminLayoutData.getDatabaseNumberOfLastMessagesIsNotSeenByAuth()

      // subsOfLastMessagesIsNotSeenByAuth.setSubscribeMessageToOrCreatedByUser()
    },
    onChooseRoom(id: number) {
      const filtered = self.rooms.items.find(item => item.id === id)
      if (!filtered) return
      // will onmount previous room
      this.ListOfMessage_onWillUnMount()
      // mount current room
      // this.ListOfMessage_onDidMountDidUpDate()
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
