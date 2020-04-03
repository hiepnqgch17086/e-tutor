import React from 'react'
import { observer } from 'mobx-react-lite'

const SlCategoryOfUser = ({
  limit = 5,
  setSearchByCategory = (categoryKey: number) => { },
  className = "mb-2"
}) => {
  const onChange = (e: any) => {
    // console.log(e.target.value)
    setSearchByCategory(parseInt(e.target.value))
  }


  return (
    <select className={`form-control ${className}`} id="exampleFormControlSelect1"
      value={limit}
      onChange={onChange}
      style={{ maxWidth: '120px' }}
    >
      <option value={1}>Students</option>
      <option value={2}>Tutors</option>
      <option value={3}>Students who have not tutor yet</option>
    </select>
  )
}

export default observer(SlCategoryOfUser)
