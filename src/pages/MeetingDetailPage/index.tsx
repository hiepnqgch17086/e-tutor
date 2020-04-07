import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IpComment from './IpComment'
import AvatarInDefault from '../../images/AvatarInDefault'
import { useParams } from 'react-router-dom'
import Data from './data'
import ListOfComment from './ListOfComment'
import useSubscribeMeetingStatus from '../../hooks/useSubscribeMeetingStatus'
import ProfilePageData from '../ProfilePage/data'
// @ts-ignore
// import { Beforeunload } from 'react-beforeunload';

const MeetingPage = () => {
  const { id = '' } = useParams()
  const { currentUser } = ProfilePageData
  const { meeting, onCreateComment, newComment } = Data
  const { creatorId, studentId, isCreatorOn, isStudentOn } = meeting
  const { setSubscribeMeetingStatus, setUnSubscribeMeetingStatus } = useSubscribeMeetingStatus({
    meetingId: parseInt(id),
    setMeetingUpdated: (meetingSnapshot: object) => {
      console.log(meetingSnapshot)
      meeting.setSnapshotUpdate(meetingSnapshot)
    }
  })

  useEffect(() => {
    Data.onDidMountDidUpdate(parseInt(id))
    // update status of meeting: isAuthOn
    // meeting.setDatabaseUpdateIsOnOrOff(true)
    // listen
    setUnSubscribeMeetingStatus()
    setSubscribeMeetingStatus()
    // detach close tab
    return () => {
      meeting.setDatabaseUpdateIsOnOrOff(false)
      // update status of meeting: isAuthOff
      // console.log('ss')
      // unlisten
      setUnSubscribeMeetingStatus()
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
            <div className="col-md-6">
              <div className="border-bottom border-top card p-2 d-flex align-items-center">
                <h3>{meeting.title}</h3>
              </div>
              <div className="d-flex flex-column">
                {/* Tutor/creator */}
                <div className="message-item px-3 py-2 d-flex align-items-center">
                  <div>
                    <img src={creatorId.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
                  </div>
                  <div className="d-inline-block v-middle pl-2">
                    <h6 className="message-title mb-0 mt-1">
                      {creatorId.name}
                    </h6>
                    <span className="font-12 text-nowrap d-block text-muted" >{currentUser.id === creatorId.id ? 'You' : 'Tutor'}</span>
                    <span className={`font-12 text-nowrap d-block font-weight-bold ${isCreatorOn && 'text-success'}`}>
                      {isCreatorOn ? 'is On' : 'is Off'}
                    </span>
                  </div>
                </div>
                {/* Student */}
                <div className="message-item px-3 py-2 d-flex align-items-center">
                  <div>
                    <img src={studentId.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
                  </div>
                  <div className="d-inline-block v-middle pl-2">
                    <h6 className="message-title mb-0 mt-1">
                      {studentId.name}
                    </h6>
                    <span className="font-12 text-nowrap d-block text-muted" >{currentUser.id === studentId.id ? 'You' : 'Student'}</span>
                    <span className={`font-12 text-nowrap d-block font-weight-bold ${isStudentOn && 'text-success'}`}>
                      {isStudentOn ? 'is On' : 'is Off'}
                    </span>
                  </div>
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
