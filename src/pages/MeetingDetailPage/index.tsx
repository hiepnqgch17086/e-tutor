import React from 'react'
import { observer } from 'mobx-react-lite'
import CurrentRoom from './CurrentRoom'
import IpComment from './IpComment'
import AvatarInDefault from '../../images/AvatarInDefault'

const MeetingPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <CurrentRoom />
              <IpComment />
            </div>
            <div className="col-lg-6">
              <div className="border-bottom border-top card p-2 d-flex align-items-center">
                <h3>Title (purpose) of the meeting</h3>
              </div>
              {/* USERS ON */}
              <div className="d-flex flex-column">
                <div className="message-item px-3 py-2 d-flex align-items-center">
                  <div>
                    <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
                  </div>
                  <div className="d-inline-block v-middle pl-2">
                    <h6 className="message-title mb-0 mt-1">Name of User 1</h6>
                    <span className="font-12 text-nowrap d-block text-muted" >Tutor</span>
                    <span className="font-12 text-nowrap d-block font-weight-bold text-success">is On</span>
                  </div>
                </div>

                <div className="message-item px-3 py-2 d-flex align-items-center">
                  <div>
                    <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
                  </div>
                  <div className="d-inline-block v-middle pl-2">
                    <h6 className="message-title mb-0 mt-1">Name of User 1</h6>
                    <span className="font-12 text-nowrap d-block text-muted" >Student</span>
                    <span className="font-12 text-nowrap d-block font-weight-bold text-muted">is Off</span>
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
