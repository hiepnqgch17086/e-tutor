import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ChatRoomStudentPage from '../data'
import MessageItem from './MessageItem'
import useSubscribeOneMessageList from '../../../hooks/useSubscribeOneMessageList'

const ListOfMessage = () => {
  const { room } = ChatRoomStudentPage
  const { setSubscribeMessage, setUnSubscribeMessage } = useSubscribeOneMessageList({
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
    return () => {
      // cleanup
    }
  }, [room.messages.length])

  // set-up listener effect
  useEffect(() => {
    // validate 
    if (!room.id) return
    //
    setSubscribeMessage()
    return () => {
      setUnSubscribeMessage()
    }
  }, [room.id])

  return (
    <div className="chat-box fix-bug-of-list-contact position-relative border-top border-left-0" id="messages" style={{ height: 'calc(60vh)' }} >
      <ul className="chat-list list-style-none px-3 pt-3">
        {/*chat Row */}
        {
          room.messages.length ? (
            <>
              {
                room.messages.flatMap(item => (
                  <MessageItem key={item.id} item={item} />
                ))
              }
            </>
          ) : null
        }

        {/* <li className="chat-item list-style-none mt-3">
          <div className="chat-img d-inline-block">
            <img src="/assets/images/users/1.jpg" alt="user" className="rounded-circle" width={45} />
          </div>
          <div className="chat-content d-inline-block pl-3">
            <h6 className="font-weight-medium">James Anderson</h6>
            <div className="msg p-2 d-inline-block mb-1">Lorem
            Ipsum is simply
            dummy text of the
                printing &amp; type setting industry.</div>
          </div>
          <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">10:56 am
            </div>
        </li> */}
      </ul>
    </div>
  )
}

export default observer(ListOfMessage)
