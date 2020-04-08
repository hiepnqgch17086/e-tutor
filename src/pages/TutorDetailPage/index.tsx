import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import { useParams } from 'react-router-dom'
import { User } from '../../models-one-entity/Users'
import HomePage from '../HomePage'
import { IS_TUTOR, IS_ADMIN } from '../../models-one-prop/role'
import { TutorHomePageModel } from '../HomePage/ForTutor/data'
import TableOfNextMeetings from '../../components/Dashboard/TableOfNextMeetings'
import TableOfTopStudentsMessage from '../../components/Dashboard/TableOfTopStudentsMessage'
import TableOfTopStudentsMeeting from '../../components/Dashboard/TableOfTopStudentsMeeting'
import ProfilePageData from '../ProfilePage/data'

const dashboardData = TutorHomePageModel.create({})
const tutorData = User.create({ role: 2 })

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
          <>
            <div className="row">
              <div className="col-lg-6">
                <TableOfNextMeetings
                  nextMeetings={dashboardData.nextMeetings}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <TableOfTopStudentsMessage
                  students={dashboardData.topTenStudentsMessage}
                />
              </div>
              <div className="col-lg-6">
                <TableOfTopStudentsMeeting
                  students={dashboardData.topTenStudentsMeeting}
                />
              </div>
            </div>
          </>
        )
      }


    </div>
  )
}

export default observer(TutorDetailPage)
