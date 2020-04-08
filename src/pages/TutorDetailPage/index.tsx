import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import HomePage from '../HomePage'
import Data from './data'
import { IS_TUTOR } from '../../models-one-prop/role'

const TutorDetailPage = () => {
  const { id = '' } = useParams()
  const { user } = Data

  useEffect(() => {
    Data.onDidMountDidUpdate(parseInt(id))
  }, [])
  // console.log('ss', id)
  return (
    <div>
      {user.role}
      {user.id}
      <ProfileDetail
      // user={user}
      />
      <HomePage
      // user={user} 
      />

    </div>
  )
}

export default observer(TutorDetailPage)
