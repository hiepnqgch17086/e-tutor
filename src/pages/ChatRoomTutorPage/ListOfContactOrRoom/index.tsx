import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'
import { defaultOfRoom } from '../../../models-one-entity/Rooms'
import { defaultOfMessage } from '../../../models-one-entity/Messages'
import ContactOrRoomItem from './ContactOrRoomItem'

const ListOfContactOrRoom = () => {
  const { rooms } = Data
  const setRoomsSortedByLastMessage = (a = defaultOfRoom, b = defaultOfRoom) => {
    const { createdAt: createdAtOfLastMessageA } = a.messages[0] || defaultOfMessage
    const { createdAt: createdAtOfLastMessageB } = b.messages[0] || defaultOfMessage
    if (createdAtOfLastMessageB > createdAtOfLastMessageA) return 1
    if (createdAtOfLastMessageB < createdAtOfLastMessageA) return -1
    return 0
  }
  return (
    <div className="position-relative fix-bug-of-list-contact border-top border-right-0" style={{
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
                  <ContactOrRoomItem key={item.id} item={item} index={index} />
                ))
            }

          </div>
        </li>
      </ul>
    </div>
  )
}

export default observer(ListOfContactOrRoom)
