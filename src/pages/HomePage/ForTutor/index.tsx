import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
import TableOfNextMeetings from '../../../components/Dashboard/TableOfNextMeetings'
import TableOfTopStudentsMeeting from '../../../components/Dashboard/TableOfTopStudentsMeeting'
import TableOfTopStudentsMessage from '../../../components/Dashboard/TableOfTopStudentsMessage'
import ProfilePageData from '../../ProfilePage/data'
import CardsCounterOfMessagesMeetingsCommentsEmailsFileUploads from '../../../components/Dashboard/CardsCounterOfMessagesMeetingsCommentsEmailsFileUploads'

const ForTutor = () => {
  const tutorId = ProfilePageData.currentUser.id
  const { tutor } = Data
  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate(tutorId)
    return () => {
      // cleanup
    }
  }, [tutorId])

  return (
    <div>
      <CardsCounterOfMessagesMeetingsCommentsEmailsFileUploads
        numberOfComments={tutor.totalOfComments}
        numberOfMessages={tutor.totalOfMessages}
        numberOfMeetings={tutor.totalOfMeetings}
        numberOfEmails={tutor.totalOfEmails}
      />
      <div className="row">
        <div className="col-md-6">
          <TableOfNextMeetings
            nextMeetings={Data.nextMeetings}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TableOfTopStudentsMessage
            students={Data.topTenStudentsMessage}
          />
        </div>
        <div className="col-md-6">
          <TableOfTopStudentsMeeting
            students={Data.topTenStudentsMeeting}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(ForTutor)
