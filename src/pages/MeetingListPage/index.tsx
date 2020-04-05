import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import ListOfMeeting from './ListOfMeeting'
import Calender from './Calender'
import moment from 'moment'

const MeetingPage = () => {

  const [dateString, setDateString] = useState(moment().format())

  const startDayOfMonth = moment(dateString).startOf('month').format('d');
  const endDayOfMonth = moment(dateString).endOf('month').format('d')

  const startDateString = moment(dateString).startOf('month').subtract(parseInt(startDayOfMonth), "days").format() // main

  const endDateString = moment(dateString).endOf('month').add((6 - parseInt(endDayOfMonth)), "days").format() // main

  // console.log('ssdemo', startDateString, endDateString)

  return (
    <div className="card">
      <div className="row">
        <div className="col-lg-8">
          <Calender
            dateString={dateString}
            startDateString={startDateString}
            endDateString={endDateString}
            setDateString={setDateString}
          />
        </div>
        <div className="col-lg-4">
          <ListOfMeeting
            dateString={dateString}
          />
        </div>

      </div>
    </div>
  )
}

export default observer(MeetingPage)
