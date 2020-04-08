import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import HomePage from '../HomePage'
import { IS_TUTOR } from '../../models-one-prop/role'

const tutor = User.create({ role: IS_TUTOR })

const TutorDetailPage = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    tutor.setId(parseInt(id))
    // tutor.getDatabase()
  }, [])

  return (
    <div>
      <ProfileDetail
        user={tutor}
      />
      <HomePage />

    </div>
  )
}

export default observer(TutorDetailPage)
