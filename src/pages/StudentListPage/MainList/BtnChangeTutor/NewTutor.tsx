import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import AvatarInDefault from '../../../../images/AvatarInDefault'
import { NORMAL, WARNING, DANGEROUS } from '../../../../models-one-entity/Users'
import { newTutor } from './data'

const NewTutor = () => {

  let classNameCustom = ''
  switch (newTutor.statusOfSupportingStudents) {
    case NORMAL:
      classNameCustom = 'text-muted'
      break;
    case WARNING:
      classNameCustom = 'bg-warning text-white p-1'
      break;
    case DANGEROUS:
      classNameCustom = 'bg-danger text-white p-1'
      break;
    default:
      break;
  }

  // useEffect(() => {
  //   newTutor.getDatabaseNumberOfStudentsOfTutor(newTutor.id)
  // }, [newTutor, newTutor.id])
  // console.log('rendering')
  return (
    <>
      <a href="#!" className="message-item align-items-center px-3 py-2 d-flex justify-content-start">
        <img src={newTutor.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
        <div className="d-inline-block v-middle pl-2">
          <h6 className="message-title mb-0 mt-1">{newTutor.name}</h6>
          <span className="font-12 text-nowrap d-block text-muted">{newTutor.email}</span>
          <span className={`font-12 text-nowrap d-block`}>
            <span className={classNameCustom}>
              {newTutor.numberOfStudentsOfTutor} student(s)
            </span>
          </span>
        </div>
      </a>
    </>
  )
}

export default observer(NewTutor)
