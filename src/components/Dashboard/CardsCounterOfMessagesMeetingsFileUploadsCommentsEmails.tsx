import React from 'react'
import { observer } from 'mobx-react-lite'

const CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails = ({
  numberOfMessages = '',
  numberOfMessagesIn7Days = '',
  numberOfMeetings = '',
  numberOfMeetingFileUploads = '',
  numberOfComments = '',
  numberOfEmails = '',
}: any) => {
  return (
    <div className="card-group">
      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfMessagesIn7Days}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                <span>Messages</span><br />
                <span>in last 7 days</span>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfMessages}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                <span>Messages</span><br />
                <span>in total</span>
              </h6>
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
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfMeetingFileUploads}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Meeting <br /> File Uploads</h6>
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
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Meeting <br /> Comments</h6>
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

export default observer(CardsCounterOfMessagesMeetingsFileUploadsCommentsEmails)
