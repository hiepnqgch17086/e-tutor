import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import './index.css'
import ListOfContacts from './ListOfContacts'
import IpMessage from './IpMessage'
import ProfilePageData from '../ProfilePage/data'
import { IS_STUDENT } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
import ListOfMessage from './ListOfMessage'

const ChatRoomTutorPage = () => {
  const history = useHistory()

  useEffect(() => {
    const { currentUser } = ProfilePageData
    if (currentUser.role !== IS_STUDENT) history.push(HOME_PAGE)
    // effect
    return () => {
    }
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-6  col-xl-6 border-left-0">
              <ListOfMessage />
              <IpMessage />
            </div>
            <div className="col-lg-6 col-xl-6 border-right">
              <ListOfContacts />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatRoomTutorPage)
