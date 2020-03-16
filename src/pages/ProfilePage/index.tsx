import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_EDIT_PAGE } from '../../routes'

const ProfilePage = () => {
  return (
    <div>
      <Button>
        <Link to={PROFILE_EDIT_PAGE}>To edit Profile</Link>
      </Button>
      {JSON.stringify(Data.currentUser)}
    </div>
  )
}

export default observer(ProfilePage)
