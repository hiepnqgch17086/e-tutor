import React from 'react'
import { Link } from 'react-router-dom'
import { get_MEETING_DETAIL_PAGE } from '../../../routes'

const ListItemOfMeeting = ({ item = '' }) => {
  const item2 = {
    title: "Meeting title",
    with: "Std/tutor one",
    id: 1
  }
  return (
    <Link to={get_MEETING_DETAIL_PAGE(item2.id)}>
      <div className="calendar-events mb-3" data-class="bg-success"
        style={{ cursor: 'pointer' }}
      >
        {item2.title} <br />
        <span className="text-muted font-14">
          with {item2.with}
        </span>
      </div>
    </Link>
  )
}

export default ListItemOfMeeting
