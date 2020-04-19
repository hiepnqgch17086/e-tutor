import React from 'react'
import { observer } from 'mobx-react-lite'
import AvatarInDefault from '../../images/AvatarInDefault'
import ProfilePageData from '../ProfilePage/data'

const CurrentTutor = () => {
  const { currentUser: { tutorId } } = ProfilePageData
  return (
    <div className="message-item py-2 d-flex align-items-center">
      <div>
        <img src={tutorId?.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
      </div>
      <div className="d-inline-block v-middle pl-2">
        <h6 className="message-title mb-0 mt-1">
          {tutorId?.name}
        </h6>
        <span className="font-12 text-nowrap d-block text-muted" >
          <i className="far fa-envelope mr-1" title={tutorId?.email} />
          {'Tutor'}
        </span>
      </div>
    </div>
  )
}

export default observer(CurrentTutor)
