import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import { IS_ADMIN, IS_TUTOR } from '../../models-one-prop/role'
import { TutorHomePageModel } from '../HomePage/ForTutor/data'
import TableOfNextMeetings from '../../components/Dashboard/TableOfNextMeetings'
import TableOfTopStudentsMessage from '../../components/Dashboard/TableOfTopStudentsMessage'
import TableOfTopStudentsMeeting from '../../components/Dashboard/TableOfTopStudentsMeeting'
import ProfilePageData from '../ProfilePage/data'
import CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails from '../../components/Dashboard/CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails'

const dashboardData = TutorHomePageModel.create({})
const tutorData = User.create({ role: IS_TUTOR })

const TutorDetailPage = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    if (id) {
      tutorData.setId(parseInt(id))
      tutorData.getDatabase()
      tutorData.getDatabaseNumberOfStudentsOfTutor(parseInt(id))
      dashboardData.onDidMountDidUpdate(parseInt(id))
    }
  }, [id])

  return (
    <div>
      <ProfileDetail
        user={tutorData}
      />
      {
        ProfilePageData.currentUser.role === IS_ADMIN && (
          <div>
            <CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails
              numberOfComments={dashboardData.tutor.totalOfComments}
              numberOfMessages={dashboardData.tutor.totalOfMessages}
              numberOfMeetings={dashboardData.tutor.totalOfMeetings}
              numberOfEmails={dashboardData.tutor.totalOfEmails}
              numberOfMessagesIn7Days={dashboardData.tutor.totalOfMessagesInNumberOfDays}
              numberOfMeetingFileUploads={dashboardData.tutor.totalOfMeetingFileUploads}
            />
            <TableOfNextMeetings
              nextMeetings={dashboardData.nextMeetings}
            />
            {/* <div className="row">


      </div> */}
            <div className="row">
              <div className="col-md-6">
                <TableOfTopStudentsMessage
                  students={dashboardData.topTenStudentsMessage}
                />
              </div>
              <div className="col-md-6">
                <TableOfTopStudentsMeeting
                  students={dashboardData.topTenStudentsMeeting}
                />
              </div>
            </div>
          </div>
        )
      }


    </div>
  )
}

export default observer(TutorDetailPage)
