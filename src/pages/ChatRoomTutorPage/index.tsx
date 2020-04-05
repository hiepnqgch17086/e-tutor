import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IpSearchContact from './IpSearchContact'
import './index.css'
import ListOfContactOrRoom from './ListOfContactOrRoom'
import ListOfMessage from './ListOfMessage'
import ProfilePageData from '../ProfilePage/data'
import { IS_TUTOR } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
import Data from './data'
import IpMessage from '../ChatRoomComponents/IpMessage'

const ChatRoomTutorPage = () => {
  const history = useHistory()
  // const {} = Data

  useEffect(() => {
    // validate
    const { currentUser } = ProfilePageData
    if (currentUser.role !== IS_TUTOR) history.push(HOME_PAGE)
    // action
    Data.onDidMountDidUpdate()
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
