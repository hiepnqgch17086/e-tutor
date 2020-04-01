import React from 'react'

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="fc-day-header fc-widget-header fc-sun">
          <span>Sun</span>

        </th>
        <th className="fc-day-header fc-widget-header fc-mon">
          <span>Mon</span>

        </th>
        <th className="fc-day-header fc-widget-header fc-tue">
          <span>Tue</span>

        </th>
        <th className="fc-day-header fc-widget-header fc-wed">
          <span>Wed</span>
        </th>
        <th className="fc-day-header fc-widget-header fc-thu">
          <span>Thu</span>
        </th>
        <th className="fc-day-header fc-widget-header fc-fri">
          <span>Fri</span>
        </th>
        <th className="fc-day-header fc-widget-header fc-sat">
          <span>Sat</span>
        </th>
      </tr>
    </thead>
  )
}

export default TableHead
