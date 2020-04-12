import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfRoom } from '../../../models-one-entity/Rooms'
import AvatarInDefault from '../../../images/AvatarInDefault'
import moment from 'moment'
import Data from '../data'
import ProfilePageData from '../../ProfilePage/data'

const ContactOrRoomItem = ({
  item = defaultOfRoom,
  isActivedRoom = false
}) => {
  const { studentId: { id: stdId, name, email, avatar }, messages } = item
  const lastMessage = messages[0]
  const { currentUser } = ProfilePageData
  const { activedRoom } = Data
  // console.log(lastMessage)
  return (
    <a href="#!" className={`btn message-item d-flex align-items-center border-bottom px-3 py-2 ${lastMessage && !lastMessage.isSeenByPartner && currentUser.id !== lastMessage.userId.id && item.id !== activedRoom.id && 'bg-light'}`}
      onClick={() => Data.onChooseRoom(item.id)}
    >
      <div className="user-img">
        <img src={avatar || AvatarInDefault} alt="user" className="img-fluid rounded-circle" width="40px" title={email} />
        <span className="profile-status online float-right" />
      </div>
      <div className="w-75 d-inline-block v-middle pl-2">
        <h6 className={`message-title mb-0 mt-1 text-left ${isActivedRoom && 'text-dark font-weight-medium'}`}>{name}</h6>
        {
          lastMessage ? (
            <>
              <span className="font-12 text-nowrap d-block text-muted text-truncate text-left">
                {lastMessage.userId.id === stdId ? null : 'You: '}
                {lastMessage.text}
              </span>
              <span className="font-12 text-nowrap d-block text-muted text-left">{moment(lastMessage.createdAt).calendar()}</span>
            </>
          ) : null
        }

      </div>
    </a>
  )
}

export default observer(ContactOrRoomItem)
