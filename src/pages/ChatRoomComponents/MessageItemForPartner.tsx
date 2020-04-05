import React from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { defaultOfMessage } from '../../models-one-entity/Messages'
import { defaultOfUser } from '../../models-one-entity/Users'
import AvatarInDefault from '../../images/AvatarInDefault'

type Props = {
  message?: typeof defaultOfMessage,
  partner?: typeof defaultOfUser | typeof defaultOfUser.tutorId
}


const MessageItemForPartner = ({
  message,
  partner,
}: Props) => {
  return (
    <li className="chat-item list-style-none mt-3" title={moment(message?.createdAt).calendar()}>
      <div className="chat-img d-inline-block">
        <img src={partner?.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={45} title={partner?.email} />
      </div>
      <div className="chat-content d-inline-block pl-3">
        <h6 className="font-weight-medium">{partner?.name}</h6>
        <div className="msg p-2 d-inline-block mb-1">{message?.text}</div>
      </div>
      {/* <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">10:57 am
  </div> */}
    </li>
  )
}

export default observer(MessageItemForPartner)
