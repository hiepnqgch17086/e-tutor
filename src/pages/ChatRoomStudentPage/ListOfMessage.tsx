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
    setMessageCreated: room.setMessageAdded
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

  // set-up listener effect
  useEffect(() => {
    // validate 
    if (room.id) {
      setSubscribeMessage()
    }
    return () => {
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
                room.messages.flatMap((item, index) => {
                  const { room } = ChatRoomStudentPageData
                  const { studentId: { tutorId } } = room
                  const { currentUser } = ProfilePageData
                  return <div key={item.id}>
                    {item.userId.id === currentUser.id ? <MessageItemForAuth message={item} /> : null}
                    {item.userId.id === tutorId?.id ? (
                      <MessageItemForPartner
                        message={item}
                        partner={tutorId}
                        shouldHideAvatar={room.getShouldHideAvatarOfMessage(index)}
                        shouldHideName={room.getShouldHideNameOfMessage(index)}
                      />
                    ) : null}
                  </div>
                })
              }
            </>
          ) : null
        }

      </ul>
    </div>
  )
}

export default observer(ListOfMessage)
