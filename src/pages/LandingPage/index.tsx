import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { HOME_PAGE } from '../../routes'

const LandingPage = () => {

  return (
    <div>
      Landing page
      <Link to={HOME_PAGE}>
        <Button>
          Home Page
          </Button>
      </Link>
    </div>
  )
}

export default observer(LandingPage)
