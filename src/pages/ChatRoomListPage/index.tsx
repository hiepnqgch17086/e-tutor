import React from 'react'
import { observer } from 'mobx-react-lite'
import IpSearchContact from './IpSearchContact'
import './index.css'
import ListOfContacts from './ListOfContacts'
import CurrentRoom from './CurrentRoom'
import IpMessage from './IpMessage'
import ProfilePageData from '../ProfilePage/data'
import { IS_TUTOR } from '../../models-one-prop/role'

const ChatRoomListPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-3 col-xl-2 border-right">
              {ProfilePageData.currentUser.role === IS_TUTOR && (
                <IpSearchContact />
              )}
              <ListOfContacts />
            </div>
            <div className="col-lg-9  col-xl-10">
              <CurrentRoom />
              <IpMessage />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatRoomListPage)
