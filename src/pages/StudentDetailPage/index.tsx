import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import { IS_ADMIN, IS_STUDENT } from '../../models-one-prop/role'
import TableOfNextMeetings from '../../components/Dashboard/TableOfNextMeetings'
import ProfilePageData from '../ProfilePage/data'
import { StudentHomePageModel } from '../HomePage/ForStudent/data'
import CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails from '../../components/Dashboard/CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails'
// import TableOfNewestComments from '../../components/Dashboard/TableOfNewestComments'

const dashboardData = StudentHomePageModel.create({})
const studentProfile = User.create({ role: IS_STUDENT })

const StudentDetailPage = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    if (id) {
      studentProfile.setId(parseInt(id))
      studentProfile.getDatabase()
      dashboardData.onDidMountDidUpdate(parseInt(id))
    }
  }, [id])

  return (
    <div>
      <ProfileDetail
        user={studentProfile}
      />
      {
        ProfilePageData.currentUser.role === IS_ADMIN && (
          <>
            <CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails
              numberOfComments={dashboardData.student.totalOfComments}
              numberOfMessages={dashboardData.student.totalOfMessages}
              numberOfMeetings={dashboardData.student.totalOfMeetings}
              numberOfEmails={dashboardData.student.totalOfEmails}
              numberOfMessagesIn7Days={dashboardData.student.totalOfMessagesInNumberOfDays}
              numberOfMeetingFileUploads={dashboardData.student.totalOfMeetingFileUploads}
            />
            <TableOfNextMeetings
              nextMeetings={dashboardData.nextMeetings}
            />
          </>
        )
      }


    </div>
  )
}

export default observer(StudentDetailPage)
