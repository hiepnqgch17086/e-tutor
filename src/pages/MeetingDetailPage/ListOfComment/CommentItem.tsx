import React from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { defaultOfMessage } from '../../../models-one-entity/Messages'
import { defaultOfUser } from '../../../models-one-entity/Users'
import AvatarInDefault from '../../../images/AvatarInDefault'
import { defaultOfComment } from '../../../models-one-entity/Comments'

const CommentItem = ({
  comment = defaultOfComment,
}) => {
  const { userId: user } = comment
  return (
    <li className="chat-item list-style-none mt-3">
      <div>
        <div className="chat-img d-inline-block">
          <img src={user?.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={45} title={user.email} />
        </div>
        <div className="chat-content d-inline-block pl-3">
          <h6 className="font-weight-small">{user.name}</h6>
          <div className="msg p-2 d-inline-block mb-1 text-dark">
            {comment.text}
          </div>
        </div>

      </div>


      <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">
        {moment(comment.createdAt).calendar()}
      </div>
    </li>
  )
}

export default observer(CommentItem)
