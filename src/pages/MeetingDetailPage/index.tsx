import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IpComment from './IpComment'
import AvatarInDefault from '../../images/AvatarInDefault'
import { useParams } from 'react-router-dom'
import Data from './data'
import ListOfComment from './ListOfComment'

const MeetingPage = () => {
  const { id = '' } = useParams()
  const { meeting } = Data
  const { creatorId, studentId, isCreatorOn, isStudentOn } = meeting

  useEffect(() => {
    Data.onDidMountDidUpdate(parseInt(id))
    return () => {
      Data.setSnapshotNew({})
    }
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <ListOfComment />
              <IpComment />
            </div>
            <div className="col-lg-6">
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
                    <span className="font-12 text-nowrap d-block text-muted" >Tutor</span>
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
                    <span className="font-12 text-nowrap d-block text-muted" >Student</span>
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
