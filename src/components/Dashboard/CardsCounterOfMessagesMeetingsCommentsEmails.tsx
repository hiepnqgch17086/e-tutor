import React from 'react'
import { observer } from 'mobx-react-lite'

const CardListOfCounter = ({
  numberOfMessages = '',
  numberOfMeetings = '',
  numberOfComments = '',
  numberOfEmails = ''
}: any) => {
  return (
    <div className="card-group">
      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfMessages}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Messages</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfMeetings}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Meetings</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfComments}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Comments</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfEmails}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Emails</h6>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default observer(CardListOfCounter)
