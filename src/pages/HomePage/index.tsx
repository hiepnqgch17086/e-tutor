import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_PAGE } from '../../routes'

const HomePage = () => {
  return (
    <div>
      <Link to={PROFILE_PAGE}>
        <Button>
          Profile Page
        </Button>
      </Link>
    </div>
  )
}

export default observer(HomePage)
