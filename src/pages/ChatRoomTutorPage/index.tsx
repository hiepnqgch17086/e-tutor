import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IpSearchContact from './IpSearchContact'
import './index.css'
import ListOfContactOrRoom from './ListOfContactOrRoom'
import ListOfMessage from './ListOfMessage'
import Data from './data'
import IpMessage from '../../components/ChatRoom/IpMessage'
// import ProfilePageData from '../ProfilePage/data'
// import { IS_TUTOR } from '../../models-one-prop/role'

const ChatRoomTutorPage = () => {

  useEffect(() => {
    Data.onDidMountDidUpdate()
    // if (ProfilePageData.currentUser.role === IS_TUTOR) {
    // }
    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [Data.rooms.textContains])
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-6  col-xl-6 border-left-0">
              <ListOfMessage />

              <IpMessage
                message={Data.newMessage}
                onCreateMessage={Data.onCreateMessage}
                disabled={Data.activedRoom.id ? false : true}
              />
            </div>
            <div className="col-lg-6 col-xl-6 border">
              <IpSearchContact />
              <ListOfContactOrRoom />
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatRoomTutorPage)
