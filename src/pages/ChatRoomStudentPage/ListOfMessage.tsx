import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ChatRoomStudentPageData from './data'
import useSubscribeMessageOfOneRoom from '../../hooks/useSubscribeMessageOfOneRoom'
import ProfilePageData from '../ProfilePage/data'
import MessageItemForAuth from '../../components/ChatRoom/MessageItemForAuth'
import MessageItemForPartner from '../../components/ChatRoom/MessageItemForPartner'

const ListOfMessage = () => {
  const { room } = ChatRoomStudentPageData
  const { setSubscribeMessage, setUnSubscribeMessage } = useSubscribeMessageOfOneRoom({
    roomId: room.id,
    setMessageCreated: room.setMessageAdded,
    setMessageUpdated_isSeenByPartner_true: (message: any) => {
      room.setMessageUpdated(message)
    }
  })



  const scrollToBottom = () => {
    const msgContainer = document.getElementById('messages');
    // @ts-ignore
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // effect of scrolldown if new comment added
  useEffect(() => {
    scrollToBottom()
  }, [room.messages.length])

  // useEffect(() => {
  //   if (
  //     room.messages[room.messages.length - 1]?.isSeenByPartner === false
  //     && room.messages[room.messages.length - 1]?.userId.id !== ProfilePageData.currentUser.id
  //   ) {
  //     room.messages[room.messages.length - 1]?.setSnapshotUpdate({ isSeenByPartner: true })
  //     room.messages[room.messages.length - 1]?.setDatabaseUpdateStatus_isSeenByPartner_true()
  //   }
  // }, [room.messages[room.messages.length - 1]])

  // set-up listener effect
  useEffect(() => {
    // validate 
    if (room.id) {
      setSubscribeMessage()
    }
    return () => {
      console.log('will unmint')
      setUnSubscribeMessage()
    }
    // eslint-disable-next-line
  }, [room.id])

  return (
    <div className="chat-box fix-bug-of-list-contact position-relative border-top border-left-0" id="messages" style={{ height: 'calc(60vh)' }} >
      <ul className="chat-list list-style-none px-3 pt-3">
        {/*chat Row */}
        {
          room.messages.length ? (
            <>
              {
                room.messages?.flatMap((item, index) => {
                  const { room } = ChatRoomStudentPageData
                  const { studentId: { tutorId } } = room
                  const { currentUser } = ProfilePageData
                  if (item.userId.id === currentUser.id) {
                    return <MessageItemForAuth
                      key={item.id}
                      message={item}
                    // shouldShow_isSeen={index === room.messages.length - 1 && item.isSeenByPartner}
                    />
                  }
                  if (item.userId.id === tutorId?.id) {
                    return <MessageItemForPartner
                      key={item.id}
                      message={item}
                      partner={tutorId}
                      shouldHideAvatar={room.getShouldHideAvatarOfMessage(index)}
                      shouldHideName={room.getShouldHideNameOfMessage(index)}
                    />
                  }
                  return null
                })
              }
            </>
          ) : null
        }
        {/* {
          room.messages.length && room.messages[room.messages.length - 1]?.isSeenByPartner && room.messages[room.messages.length - 1]?.userId.id === ProfilePageData.currentUser.id ? (
            <li>Seen</li>
          ) : null
        } */}

      </ul>
    </div>
  )
}

export default observer(ListOfMessage)
