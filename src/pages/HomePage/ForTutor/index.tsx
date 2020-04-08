import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import TableOfNextMeetings from './TableOfNextMeetings'
import TableOfTopStudentsMessage from './TableOfTopStudentsMessage'
import TableOfTopStudentsMeeting from './TableOfTopStudentsMeeting'
import Data from './data'

const ForTutor = ({ tutorId = 0 }) => {

  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate(tutorId)
    return () => {
      // cleanup
    }
  }, [])

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

export default observer(ForTutor)
