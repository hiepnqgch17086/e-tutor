import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PROFILE_PAGE } from '../../routes'

const HomePage = () => {
  return (
    <div>
      <Button color="primary">
        <Link to={PROFILE_PAGE}>To Profile</Link>
      </Button>
    </div>
  )
}

export default observer(HomePage)
