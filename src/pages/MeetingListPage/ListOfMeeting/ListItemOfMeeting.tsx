import React from 'react'
import { Link } from 'react-router-dom'
import { get_MEETING_DETAIL_PAGE } from '../../../routes'
import moment from 'moment'
import AvatarInDefault from '../../../images/AvatarInDefault'

const ListItemOfMeeting = ({ item = '' }) => {
  const item2 = {
    title: "Meeting title",
    with: "Std/tutor one",
    id: 1,
    name: 'Name tutor/student',
    avatar: '',
    startAt: moment().format(),
    endAt: moment().format()
  }
  return (
    <div className="calendar-events mb-3" data-class="bg-success"
      style={{ cursor: 'pointer' }}
    >
      <Link to={get_MEETING_DETAIL_PAGE(item2.id)} className="message-item d-flex align-items-center">
        <img src={item2.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
        <div className="w-75 d-inline-block v-middle pl-2">
          <h6 className="message-title mb-0 mt-1">{item2.name}</h6>
          <span className="font-12 text-nowrap d-block text-muted">Title: {item2.title}</span>
          <span className="font-12 text-nowrap d-block text-muted">
            {moment(item2.startAt).format('LT') + " - " + moment(item2.endAt).format('LT')}
          </span>
        </div>
      </Link>

      {/* <Link to={}>
        <span>
          {item2.title} <br />
          <span className="text-muted font-14">
            with {item2.with}
          </span>
        </span>
      </Link> */}

    </div>
  )
}

export default ListItemOfMeeting
