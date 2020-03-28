import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { USER_ADD_PAGE } from '../../routes'

const BtnAddUser = () => {
  return (
    <div className="mb-2 d-flex justify-content-center">
      <Link to={USER_ADD_PAGE}>
        <Button color="primary">Add User</Button>
      </Link>
    </div>
  )
}

export default BtnAddUser
