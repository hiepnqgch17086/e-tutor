import React from 'react'

const ListItemOfMeeting = ({ item = '' }) => {
  return (
    <div className="calendar-events mb-3" data-class="bg-success"
      style={{ cursor: 'pointer' }}
    >
      {item}
    </div>
  )
}

export default ListItemOfMeeting
