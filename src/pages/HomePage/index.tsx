import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_PAGE, ALL_USERS_PAGE } from '../../routes'
import ProfilePageData from '../ProfilePage/data'
import { IS_ADMIN } from '../../models-one-entity/Users'

const HomePage = () => {
  return (
    <div>
      <Link to={PROFILE_PAGE}>
        <Button>
          Profile Page
        </Button>
      </Link>
      {
        ProfilePageData.currentUser.userPermissions.get(IS_ADMIN) ? (
          <Link to={ALL_USERS_PAGE}>
            <Button>
              All Users Page
            </Button>
          </Link>
        ) : null
      }

    </div>
  )
}

export default observer(HomePage)
