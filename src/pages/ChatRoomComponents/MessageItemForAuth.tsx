import React from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { defaultOfMessage } from '../../models-one-entity/Messages'

const MessageItemForAuth = ({
  message = defaultOfMessage,
}) => {
  return (
    <li className="chat-item odd list-style-none mt-3" title={moment(message.createdAt).calendar()}>
      <div className="chat-content text-right d-inline-block pl-3">
        <div className="box msg p-2 d-inline-block mb-1 box">
          {message.text}
        </div>
        <br />
      </div>
    </li>
  )
}

export default observer(MessageItemForAuth)
