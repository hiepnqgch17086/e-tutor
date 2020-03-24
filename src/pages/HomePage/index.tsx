import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_PAGE, ALL_USERS_PAGE, CLASS_LIST_PAGE } from '../../routes'
import ProfilePageData from '../ProfilePage/data'
import { IS_ADMIN } from '../../models-one-prop/role'
// import AdminLayout from '../../layout/AdminLayout'

const HomePage = () => {
  return (
    <div>
      <div>
        <Link to={PROFILE_PAGE}>
          <Button>
            Profile Page
          </Button>
        </Link>
        <Link to={CLASS_LIST_PAGE}>
          <Button>
            Class list page
        </Button>
        </Link>
        {
          ProfilePageData.currentUser.role === (IS_ADMIN) ? (
            <Link to={ALL_USERS_PAGE}>
              <Button>
                All Users Page
            </Button>
            </Link>
          ) : null
        }

      </div>
    </div>
  )
}

export default observer(HomePage)
