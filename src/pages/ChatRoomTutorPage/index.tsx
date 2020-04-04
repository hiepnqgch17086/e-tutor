import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IpSearchContact from './IpSearchContact'
import './index.css'
import ListOfContacts from './ListOfContacts'
import ListOfMessage from './ListOfMessage'
import IpMessage from './IpMessage'
import ProfilePageData from '../ProfilePage/data'
import { IS_TUTOR } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'

const ChatRoomTutorPage = () => {
  const history = useHistory()

  useEffect(() => {
    const { currentUser } = ProfilePageData
    if (currentUser.role !== IS_TUTOR) history.push(HOME_PAGE)
    // effect
    return () => {
      // cleanup
    }
  }, [])
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-6  col-xl-6 border-left-0">
              <div className="chat-box fix-bug-of-list-contact position-relative border-top border-left-0" style={{ height: 'calc(60vh)' }}>
                {/*chat Row */}
                <ListOfMessage />
              </div>
              <IpMessage />
            </div>
            <div className="col-lg-6 col-xl-6 border">
              <IpSearchContact />
              <ListOfContacts />
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatRoomTutorPage)
