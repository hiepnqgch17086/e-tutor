import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import CardsCounterOfMessagesMeetingsCommentsEmailsFileUploads from '../../../components/Dashboard/CardsCounterOfMessagesMeetingsCommentsEmailsFileUploads'
import TableOfNewestComments from '../../../components/Dashboard/TableOfNewestComments'
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
      <CardsCounterOfMessagesMeetingsCommentsEmailsFileUploads
        numberOfComments={student.totalOfComments}
        numberOfMessages={student.totalOfMessages}
        numberOfMeetings={student.totalOfMeetings}
        numberOfEmails={student.totalOfEmails}
      />
      <div className="row">
        <div className="col-md-4">
          <TableOfNextMeetings
            nextMeetings={nextMeetings}
          />
        </div>
        <div className="col-md-8">
          <TableOfNewestComments />
        </div>

      </div>

    </div>
  )
}

export default observer(ForStudent)
