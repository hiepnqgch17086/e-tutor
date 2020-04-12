import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails from '../../../components/Dashboard/CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails'
import TableOfNextMeetings from '../../../components/Dashboard/TableOfNextMeetings'
import Data from './data'
import ProfilePageData from '../../ProfilePage/data'

const ForStudent = () => {
  const { student, nextMeetings } = Data
  const { id } = ProfilePageData.currentUser

  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate(id)
    return () => {
      // cleanup
    }
  }, [id])

  return (
    <div>
      <CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails
        numberOfComments={student.totalOfComments}
        numberOfMessages={student.totalOfMessages}
        numberOfMeetings={student.totalOfMeetings}
        numberOfEmails={student.totalOfEmails}
        numberOfMessagesIn7Days={student.totalOfMessagesInNumberOfDays}
        numberOfMeetingFileUploads={student.totalOfMeetingFileUploads}
      />
      <TableOfNextMeetings
        nextMeetings={nextMeetings}
      />
      {/* <div className="row">
        <div className="col-md-12">
          
        </div>

      </div> */}

    </div>
  )
}

export default observer(ForStudent)
