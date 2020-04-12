import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IpComment from './IpComment'
import AvatarInDefault from '../../images/AvatarInDefault'
import { useParams } from 'react-router-dom'
import Data from './data'
import ListOfComment from './ListOfComment'
import ProfilePageData from '../ProfilePage/data'
import FileUploadsOfStudent from './FileUploadsOfStudent'
import FileUploadsOfCreator from './FileUploadsOfCreator'

const MeetingPage = () => {
  const { id = '' } = useParams()
  const { currentUser } = ProfilePageData
  const { meeting, onCreateComment, newComment } = Data
  const { creatorId, studentId } = meeting
  // const { setSubscribeMeetingStatus, setUnSubscribeMeetingStatus } = useSubscribeMeetingStatus({
  //   meetingId: parseInt(id),
  //   setMeetingUpdated: (meetingSnapshot: object) => {
  //     console.log(meetingSnapshot)
  //     meeting.setSnapshotUpdate(meetingSnapshot)
  //   }
  // })

  useEffect(() => {
    Data.onDidMountDidUpdate(parseInt(id))
    // update status of meeting: isAuthOn
    // meeting.setDatabaseUpdateIsOnOrOff(true)
    // listen
    // setUnSubscribeMeetingStatus()
    // setSubscribeMeetingStatus()
    // detach close tab
    return () => {
      // setUnSubscribeMeetingStatus()
      // meeting.setDatabaseUpdateIsOnOrOff(false)
      // update status of meeting: isAuthOff
      // console.log('ss')
      // unlisten
      Data.setSnapshotNew({})
    }
  }, [id])

  return (
    <div className="row">
      {/* <Beforeunload onBeforeunload={async (e: any) => {
        await Data.onCloseTabOrBrowser()
        // e.preventDefault()
        // console.log('sss')
        return e.preventDefault()
      }} /> */}
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-6">
              <ListOfComment />
              <IpComment
                comment={newComment}
                onCreateComment={onCreateComment}
              />
            </div>
            <div className="col-md-6 p-2">
              <div className="border-bottom border-top card p-2 d-flex align-items-center">
                <h3>{meeting.title}</h3>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {/* Student */}
                  <FileUploadsOfStudent
                    student={studentId}
                  />
                </div>

                <div className="col-md-6">
                  {/* Tutor/creator */}
                  <FileUploadsOfCreator
                    creator={creatorId}
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(MeetingPage)
