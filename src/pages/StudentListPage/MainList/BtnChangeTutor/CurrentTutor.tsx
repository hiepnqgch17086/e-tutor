import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import AvatarInDefault from '../../../../images/AvatarInDefault'
import { UserBase, User } from '../../../../models-one-entity/Users'

const CurrentTutor = ({
  currentTutor = UserBase.create({})
}) => {

  const [tempUser] = useState(User.create({}))

  useEffect(() => {
    tempUser.getDatabaseNumberOfStudentsOfTutor(currentTutor.id)
  }, [tempUser, currentTutor.id])
  // console.log('rendering')
  return (
    <>
      <div className="mt-2">Current Tutor</div>
      <a href="#!" className="message-item align-items-center px-3 py-2 d-flex justify-content-start">
        <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
        <div className="d-inline-block v-middle pl-2">
          <h6 className="message-title mb-0 mt-1">{currentTutor.name}</h6>
          <span className="font-12 text-nowrap d-block text-muted">{currentTutor.email}</span>
          <span className="font-12 text-nowrap d-block text-muted">
            {tempUser.numberOfStudentsOfTutor} student(s)
          </span>
        </div>
      </a>
    </>
  )
}

export default observer(CurrentTutor)
