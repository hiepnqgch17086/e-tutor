import React from 'react'
import { observer } from 'mobx-react-lite'
import BtnUploadFile from './BtnUploadFile'
import { defaultOfComment } from '../../../models-one-entity/Comments'
import { defaultOfMeeting } from '../../../models-one-entity/Meetings'

const IpMessage = ({
  comment = defaultOfComment,
  meeting = defaultOfMeeting,
  onCreateComment = () => { },
}) => {

  const onSubmit = () => {
    if (comment._getTextConstraint()) return
    onCreateComment()
  }

  const onChangeText = (text: string) => {
    comment.setText(text)
  }

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) onSubmit()
  }

  const onFocus = () => {
    // update status of meeting: isAuthOn
    // meeting.setDatabaseUpdateIsOnOrOff(true)
  }


  return (
    <div className="card-body border-top border-right">
      <div className="d-flex">
        <div className="input-field mt-0 mb-0 flex-grow-1">
          <input id="textarea1" placeholder="Type and enter" className="form-control border" type="text"
            value={comment.text}
            onKeyUp={onKeyUp}
            onChange={e => {
              const text = e.target.value
              onChangeText(text)
            }}
            onFocus={onFocus}
          />
        </div>
        <div>
          <BtnUploadFile />
          <a className="btn-circle btn-lg btn-cyan float-right text-white ml-2 mr-n2" href="#!"
            onClick={onSubmit}
          ><i className="fas fa-paper-plane" /></a>
        </div>
      </div>

    </div>
  )
}

export default observer(IpMessage)
