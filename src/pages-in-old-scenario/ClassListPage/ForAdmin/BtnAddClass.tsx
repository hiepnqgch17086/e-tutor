import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CLASS_ADD_PAGE } from '../../../routes'

const BtnAddClass = () => {
  return (
    <div className="mb-2 d-flex justify-content-center">
      <Link to={CLASS_ADD_PAGE}>
        <Button color="primary">Add Class</Button>
      </Link>
    </div>
  )
}

export default BtnAddClass
