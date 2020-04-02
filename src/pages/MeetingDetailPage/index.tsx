import React from 'react'
import { observer } from 'mobx-react-lite'
import CurrentRoom from './CurrentRoom'
import IpComment from './IpComment'

const MeetingPage = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-12">
              <div className="border-bottom card p-2">
                <h3>Title (purpose) of the meeting</h3>
              </div>
              <CurrentRoom />
              <IpComment />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(MeetingPage)
