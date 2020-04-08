import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfMessage } from '../../models-one-entity/Messages'

const IpMessage = ({
  message = defaultOfMessage,
  onCreateMessage = () => { },
  disabled = false
}) => {

  const onChangeText = (text: string) => {
    message.setText(text)
  }

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) onCreateMessage()
  }

  return (
    <div className="card-body border border-left-0">
      <div className="d-flex">
        <div className="input-field mt-0 mb-0 flex-grow-1">
          <input
            disabled={disabled}
            id="textarea1"
            placeholder="Type and enter"
            className="form-control border" type="text"
            value={message.text}
            onKeyUp={onKeyUp}
            onChange={e => {
              const text = e.target.value
              onChangeText(text)
            }}
          />
        </div>
        <div>
          {/* <a className="btn-circle btn-lg btn-cyan float-right text-white mr-2" href="#!"
            style={{ backgroundColor: 'grey' }}
          ><i className="fas fa-paperclip" /></a> */}
          <a
            className="btn-circle btn-lg btn-cyan float-right text-white ml-2 mr-n2"
            href="#!"
            onClick={onCreateMessage}
          >
            <i className="fas fa-paper-plane" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default observer(IpMessage)
