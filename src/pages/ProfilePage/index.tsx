import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ButtonGroup } from 'reactstrap'
import ProfileDetail from './ProfileDetail'
// import AdminLayout from '../../layout/AdminLayout'
import Data from './data'
import BtnEditPassword from './BtnEditPassword'

const ProfilePage = () => {

  useEffect(() => {
    Data.onDidMount()
  }, [])

  const { currentUser } = Data
  return (
    <>
      <ProfileDetail user={currentUser} />
      <ButtonGroup>
        <BtnEditPassword user={currentUser} />
      </ButtonGroup>
    </>
  )
}

export default observer(ProfilePage)
