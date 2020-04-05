import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'
import ContactOrRoomItem from './ContactOrRoomItem'
import useSubscribeMessageOfManyRoomsForTutor from '../../../hooks/useSubscribeMessageOfManyRoomsForTutor'
import ProfilePageData from '../../ProfilePage/data'
import { defaultOfRoom } from '../../../models-one-entity/Rooms'
import { defaultOfMessage } from '../../../models-one-entity/Messages'

const ListOfContactOrRoom = () => {
  const { rooms } = Data
  const { setUnSubscribeMessage, setSubscribeMessage } = useSubscribeMessageOfManyRoomsForTutor({
    setMessageCreated: (message: object) => {
      rooms.setLatestMessageOfRoom(message)
      // console.log(message)
    }
  })

  const setRoomsSortedByLastMessage = (a = defaultOfRoom, b = defaultOfRoom) => {
    const { createdAt: createdAtOfLastMessageA } = a.messages[0] || defaultOfMessage
    const { createdAt: createdAtOfLastMessageB } = b.messages[0] || defaultOfMessage
    if (createdAtOfLastMessageB > createdAtOfLastMessageA) return 1
    if (createdAtOfLastMessageB < createdAtOfLastMessageA) return -1
    return 0
  }

  useEffect(() => {
    if (!ProfilePageData.currentUser.id) return
    setUnSubscribeMessage()
    setSubscribeMessage()
    return () => {
      setUnSubscribeMessage()
    }
  }, [ProfilePageData.currentUser.id])

  return (
    <div className="position-relative fix-bug-of-list-contact border-top" style={{
      height: 'calc(60vh)'
    }}>
      <ul className="mailbox list-style-none">
        <li>
          <div className="message-center">
            {/* Message */}
            {
              rooms.items.slice()
                .sort(setRoomsSortedByLastMessage)
                .map((item, index) => (
                  <ContactOrRoomItem key={item.id} item={item}
                    isActivedRoom={item.id === Data.activedRoom.id}
                  />
                ))
            }

          </div>
        </li>
      </ul>
    </div>
  )
}

export default observer(ListOfContactOrRoom)
