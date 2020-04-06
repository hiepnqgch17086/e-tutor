import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'
import CommentItem from './CommentItem'
import { getSnapshot } from 'mobx-state-tree'
// import useSubscribeMessageOfOneRoom from '../../hooks/useSubscribeMessageOfOneRoom'
// import MessageItemForAuth from '../ChatRoomComponents/MessageItemForAuth'
// import MessageItemForPartner from '../ChatRoomComponents/MessageItemForPartner'
// import ProfilePageData from '../../ProfilePage/data'

const ListOfComment = () => {
  const { meeting } = Data
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
  }, [meeting.comments.length])

  // set-up listener effect
  useEffect(() => {
    // validate 
    if (meeting.id) {
    }
    return () => {
    }
    // eslint-disable-next-line
  }, [meeting.id])

  return (
    <div className="chat-box fix-bug-of-list-contact position-relative border-top border-left-0" id="messages" style={{ height: 'calc(60vh)' }} >
      <ul className="chat-list list-style-none px-3 pt-3">
        {/*chat Row */}

        {
          meeting.comments.length ? (
            <>
              {
                meeting.comments.flatMap((item, index) => {
                  return <CommentItem key={item.id} comment={item} />
                })
              }
            </>
          ) : null
        }
      </ul>
    </div>
  )
}

export default observer(ListOfComment)
