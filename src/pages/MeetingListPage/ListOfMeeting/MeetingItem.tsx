import React from 'react'
import { Link } from 'react-router-dom'
import { get_MEETING_DETAIL_PAGE } from '../../../routes'
import moment from 'moment'
import AvatarInDefault from '../../../images/AvatarInDefault'
import { defaultOfMeeting } from '../../../models-one-entity/Meetings'

const MeetingItem = ({ item = defaultOfMeeting }) => {
  // const item = {
  //   title: "Meeting title",
  //   with: "Std/tutor one",
  //   id: 1,
  //   name: 'Name tutor/student',
  //   avatar: '',
  //   startAt: moment().format(),
  //   endAt: moment().format()
  // }
  return (
    <div className="calendar-events mb-3" data-class="bg-success"
      style={{ cursor: 'pointer' }}
    >
      <Link to={get_MEETING_DETAIL_PAGE(item.id)} className="message-item d-flex align-items-center">
        <img src={item.studentId.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
        <div className="w-75 d-inline-block v-middle pl-2">
          <h6 className="message-title mb-0 mt-1">{item.studentId.name}</h6>
          <span className="font-12 text-nowrap d-block text-muted">Title: {item.title}</span>
          <span className="font-12 text-nowrap d-block text-muted">
            {'Start At: ' + moment(item.startAt).calendar()}
          </span>
          <span className="font-12 text-nowrap d-block text-muted">
            {'End At: ' + moment(item.endAt).calendar()}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default MeetingItem
