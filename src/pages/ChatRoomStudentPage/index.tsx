import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import './index.css'
import IpMessage from '../ChatRoomComponents/IpMessage'
import ProfilePageData from '../ProfilePage/data'
import ListOfMessage from './ListOfMessage'
import Data from './data'
import { IS_STUDENT } from '../../models-one-prop/role'

const ChatRoomStudentPage = () => {
  const { currentUser } = ProfilePageData

  // THIS SHOULD SET ONLY ONE TIME
  useEffect(() => {
    if (ProfilePageData.currentUser.role === IS_STUDENT) {
      Data.onDidMountDidUpdate()
    }
  }, [currentUser.id])

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="border-left-0">
            <ListOfMessage />
            <IpMessage
              message={Data.newMessage}
              onCreateMessage={Data.onCreateMessage}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatRoomStudentPage)
