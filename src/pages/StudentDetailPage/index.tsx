import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import HomePage from '../HomePage'

const StudentDetailPage = () => {
  const { id = '' } = useParams()

  const user = User.create({
    id: parseInt(id) || 0,
    avatar: '',
    name: 'student1',
    role: 3,
  })

  useEffect(() => {
    // Data.onDidMountDidUpdate(parseInt(id?)
  }, [])
  // console.log('ss', id)
  return (
    <div>
      <ProfileDetail
      // user={user}
      />
    </div>
  )
}

export default observer(StudentDetailPage)
