import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CLASS_LIST_PAGE } from '../../routes'

const BtnBackToList = () => {
  return (
    <div>
      <Link to={CLASS_LIST_PAGE}>
        <Button>Back to Class list</Button>
      </Link>
    </div>
  )
}

export default BtnBackToList
