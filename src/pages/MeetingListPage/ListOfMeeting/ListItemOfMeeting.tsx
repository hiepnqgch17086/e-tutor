import React from 'react'

const ListItemOfMeeting = ({ item = '' }) => {
  const item2 = {
    title: "Meeting title",
    with: "Std/tutor one"
  }
  return (
    <div className="calendar-events mb-3" data-class="bg-success"
      style={{ cursor: 'pointer' }}
    >
      {item2.title} <br />
      <span className="text-muted font-14">
        with {item2.with}
      </span>
    </div>
  )
}

export default ListItemOfMeeting
