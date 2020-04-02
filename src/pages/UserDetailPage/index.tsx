import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../../pages/ProfilePage/ProfileDetail'
import Data from './data'
import { useParams } from 'react-router-dom'


const UserDetailPage = () => {
  const { user } = Data
  const { id = "" } = useParams()

  useEffect(() => {
    user.setId(id)
    user.getDatabase()
  }, [])
  // console.log('ss', id)
  return (
    <div>
      {
        user.email ? (
          <ProfileDetail
            user={user}
          />
        ) : null
      }
    </div>
  )
}

export default observer(UserDetailPage)
