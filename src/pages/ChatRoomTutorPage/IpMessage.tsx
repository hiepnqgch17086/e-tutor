import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'

const IpMessage = () => {

  const { newMessage: message, onCreateMessage } = Data

  const onChangeText = (text: string) => {
    message.setText(text)
  }

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) onCreateMessage()
  }

  return (
    <div className="card-body border border-left-0">
      <div className="row">
        <div className="col-9">
          <div className="input-field mt-0 mb-0">
            <input
              id="textarea1"
              placeholder="Type and enter"
              className="form-control border-0" type="text"
              value={message.text}
              onKeyUp={onKeyUp}
              onChange={e => {
                const text = e.target.value
                onChangeText(text)
              }}
            />
          </div>
        </div>
        <div className="col-3" style={{ padding: '0px' }}>
          {/* <a className="btn-circle btn-lg btn-cyan float-right text-white mr-2" href="#!"
            style={{ backgroundColor: 'grey' }}
          ><i className="fas fa-paperclip" /></a> */}
          <a
            className="btn-circle btn-lg btn-cyan float-right text-white ml-1 mr-2"
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
