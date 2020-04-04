import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../../pages/ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import HomePage from '../HomePage'


const UserDetailPage = () => {
  // const { user } = Data
  const { id = '' } = useParams()

  const user = User.create({
    id: parseInt(id),
    avatar: '',
    name: 'student1',
    role: 3,
  })

  useEffect(() => {
  }, [])
  // console.log('ss', id)
  return (
    <div>
      <ProfileDetail
        user={user}
      />
      <HomePage user={user} />

    </div>
  )
}

export default observer(UserDetailPage)
