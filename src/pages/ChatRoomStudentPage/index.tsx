import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import './index.css'
import IpMessage from './IpMessage'
import ProfilePageData from '../ProfilePage/data'
import { IS_STUDENT } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
import ListOfMessage from './ListOfMessage'
import Data from './data'

const ChatRoomTutorPage = () => {
  const history = useHistory()
  const { currentUser } = ProfilePageData

  // THIS SHOULD SET ONLY ONE TIME
  useEffect(() => {
    if (currentUser.role !== IS_STUDENT) history.push(HOME_PAGE)
    Data.onDidMountDidUpdate()
  }, [currentUser.id])

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="border-left-0">
            <ListOfMessage />
            <IpMessage />
          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatRoomTutorPage)
