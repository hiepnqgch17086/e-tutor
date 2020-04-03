import React from 'react'
import { observer } from 'mobx-react-lite'
import { STUDENTS, STUDENTS_WHO_HAVE_NOT_TUTOR_YET } from './definitions'

const SlCategoryOfUser = ({
  category = STUDENTS,
  setCategory = (category: string) => { },
  setPage = (page: number) => { },
  className = "mb-2"
}) => {
  const onChange = (e: any) => {
    setCategory(e.target.value)
    setPage(1)
  }


  return (
    <select className={`form-control ${className}`} id="exampleFormControlSelect1"
      value={category}
      onChange={onChange}
    >
      <option value={STUDENTS}>{STUDENTS}</option>
      <option value={STUDENTS_WHO_HAVE_NOT_TUTOR_YET}>{STUDENTS_WHO_HAVE_NOT_TUTOR_YET}</option>
    </select>
  )
}

export default observer(SlCategoryOfUser)
