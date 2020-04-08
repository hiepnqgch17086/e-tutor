import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
import TableOfNextMeetings from '../../../components/Dashboard/TableOfNextMeetings'
import TableOfTopStudentsMeeting from '../../../components/Dashboard/TableOfTopStudentsMeeting'
import TableOfTopStudentsMessage from '../../../components/Dashboard/TableOfTopStudentsMessage'
import ProfilePageData from '../../ProfilePage/data'

const ForTutor = () => {
  const tutorId = ProfilePageData.currentUser.id
  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate(tutorId)
    return () => {
      // cleanup
    }
  }, [tutorId])

  return (
    <div>
      <div className="row">
        <div className="col-mg-6">
          <TableOfNextMeetings
            nextMeetings={Data.nextMeetings}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-mg-6">
          <TableOfTopStudentsMessage
            students={Data.topTenStudentsMessage}
          />
        </div>
        <div className="col-mg-6">
          <TableOfTopStudentsMeeting
            students={Data.topTenStudentsMeeting}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(ForTutor)
