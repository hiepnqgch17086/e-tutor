import React from 'react'
import { observer } from 'mobx-react-lite'
import TableOfNextMeetings from './TableOfNextMeetings'
import TableOfTopStudentsMessage from './TableOfTopStudentsMessage'
import TableOfTopStudentsMeeting from './TableOfTopStudentsMeeting'

const ForStudent = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <TableOfNextMeetings />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <TableOfTopStudentsMessage />
        </div>
        <div className="col-lg-6">
          <TableOfTopStudentsMeeting />
        </div>
      </div>
    </div>
  )
}

export default observer(ForStudent)
