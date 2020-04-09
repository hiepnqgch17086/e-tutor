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
import CardsCounterOfMessagesMeetingsCommentsEmails from '../../components/Dashboard/CardsCounterOfMessagesMeetingsCommentsEmails'

const dashboardData = TutorHomePageModel.create({})
const tutorData = User.create({ role: IS_TUTOR })

const TutorDetailPage = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    if (id) {
      tutorData.setId(parseInt(id))
      tutorData.getDatabase()
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
            <CardsCounterOfMessagesMeetingsCommentsEmails
              numberOfComments={dashboardData.tutor.totalOfComments}
              numberOfMessages={dashboardData.tutor.totalOfMessages}
              numberOfMeetings={dashboardData.tutor.totalOfMeetings}
              numberOfEmails={dashboardData.tutor.totalOfEmails}
              numberOfMessagesIn7Days={dashboardData.tutor.totalOfMessagesInNumberOfDays}
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
