import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CLASS_ADD_PAGE } from '../../../routes'

const BtnAddClass = () => {
  return (
    <div>
      <Link to={CLASS_ADD_PAGE}>
        <Button>Add Class</Button>
      </Link>
    </div>
  )
}

export default BtnAddClass
