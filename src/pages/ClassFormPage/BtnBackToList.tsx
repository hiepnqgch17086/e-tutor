import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CLASS_LIST_PAGE } from '../../routes'
import btnNavigateClasses from '../../reusable-classes/btnNavigateClasses'

const BtnBackToList = () => {
  return (
    <div className={btnNavigateClasses}>
      <Link to={CLASS_LIST_PAGE}>
        <Button>Back to Class list</Button>
      </Link>
    </div>
  )
}

export default BtnBackToList
