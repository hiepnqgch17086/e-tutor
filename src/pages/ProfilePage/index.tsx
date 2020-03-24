import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_EDIT_PAGE } from '../../routes'
import ProfileDetail from './ProfileDetail'
// import AdminLayout from '../../layout/AdminLayout'
import Data from './data'

const ProfilePage = () => {
  const { currentUser } = Data
  return (
    <>
      <ProfileDetail user={currentUser} />
      <Link to={PROFILE_EDIT_PAGE}>
        <Button>
          Edit Profile
        </Button>
      </Link>
    </>
  )
}

export default observer(ProfilePage)
