import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ChatRoomTutorPageData from './data'
// import useSubscribeMessageOfOneRoom from '../../hooks/useSubscribeMessageOfOneRoom'
import MessageItemForAuth from '../../components/ChatRoom/MessageItemForAuth'
import MessageItemForPartner from '../../components/ChatRoom/MessageItemForPartner'
import ProfilePageData from '../ProfilePage/data'
import { getSnapshot } from 'mobx-state-tree'

const ListOfMessage = () => {
  const { activedRoom, ListOfMessage_onDidMountDidUpDate, ListOfMessage_onWillUnMount } = ChatRoomTutorPageData
  // const { setSubscribeMessage, setUnSubscribeMessage } = useSubscribeMessageOfOneRoom({
  //   roomId: activedRoom.id,
  //   setMessageCreated: activedRoom.setMessageAdded
  // })

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
  }, [activedRoom.messages.length])

  // useEffect(() => {
  //   if (
  //     activedRoom.messages[activedRoom.messages.length - 1]?.isSeenByPartner === false
  //     && activedRoom.messages[activedRoom.messages.length - 1]?.userId.id !== ProfilePageData.currentUser.id
  //   ) {
  //     activedRoom.messages[activedRoom.messages.length - 1]?.setSnapshotUpdate({ isSeenByPartner: true })
  //     activedRoom.messages[activedRoom.messages.length - 1]?.setDatabaseUpdateStatus_isSeenByPartner_true()
  //   }
  // }, [activedRoom.messages[activedRoom.messages.length - 1]])

  // set-up listener effect
  useEffect(() => {
    // validate 
    ListOfMessage_onDidMountDidUpDate()
    return () => {
      console.log('will unmint')
      // cleanup
      // setUnSubscribeMessage()
      ListOfMessage_onWillUnMount()
    }
    // eslint-disable-next-line
  }, [activedRoom.id])

  return (
    <div className="chat-box fix-bug-of-list-contact position-relative border-top border-left-0" id="messages" style={{ height: 'calc(60vh)' }} >
      <ul className="chat-list list-style-none px-3 pt-3">
        {/*chat Row */}
        {
          activedRoom.messages.length ? (
            <>
              {
                activedRoom.messages.flatMap((item, index) => {
                  const { activedRoom: { studentId } } = ChatRoomTutorPageData
                  const { currentUser } = ProfilePageData
                  if (item.userId.id === currentUser.id) {
                    return <MessageItemForAuth
                      message={item} key={item.id}
                    // shouldShow_isSeen={index === activedRoom.messages.length - 1 && item.isSeenByPartner}
                    />
                  }
                  if (item.userId.id === studentId.id) {
                    return <MessageItemForPartner message={item} partner={studentId}
                      shouldHideAvatar={activedRoom.getShouldHideAvatarOfMessage(index)}
                      shouldHideName={activedRoom.getShouldHideNameOfMessage(index)}
                      key={item.id}
                    />
                  }
                  return null
                })
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

        {/*         
        {
          activedRoom.messages.length && activedRoom.messages[activedRoom.messages.length - 1]?.isSeenByPartner && activedRoom.messages[activedRoom.messages.length - 1]?.userId.id === ProfilePageData.currentUser.id ? (
            <li>Seen</li>
          ) : null
        } */}
      </ul>
    </div>
  )
}

export default observer(ListOfMessage)
