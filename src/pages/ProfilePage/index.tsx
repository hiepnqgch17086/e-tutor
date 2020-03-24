import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_EDIT_PAGE } from '../../routes'

const ProfilePage = () => {
  return (
    <Container>
      <Link to={PROFILE_EDIT_PAGE}>
        <Button>
          Edit Profile
        </Button>
      </Link>
    </Container>
  )
}

export default observer(ProfilePage)
