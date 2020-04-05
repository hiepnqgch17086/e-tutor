import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ListOfMeeting from './ListOfMeeting'
import Calender from './Calender'
import moment from 'moment'
import Data from './data'

const MeetingPage = () => {

  const [dateString, setDateString] = useState(moment().format())

  const startDayOfMonth = moment(dateString).startOf('month').format('d');
  const endDayOfMonth = moment(dateString).endOf('month').format('d')

  const fromAt = moment(dateString).startOf('month').subtract(parseInt(startDayOfMonth), "days").format() // main

  const toAt = moment(dateString).endOf('month').add((6 - parseInt(endDayOfMonth)), "days").format() // main

  useEffect(() => {
    Data.onDidMountDidUpdate({ fromAt, toAt })
    return () => {
    }
    // eslint-disable-next-line
  }, [fromAt])

  return (
    <div className="card">
      <div className="row">
        <div className="col-lg-8">
          <Calender
            dateString={dateString}
            fromAt={fromAt}
            toAt={toAt}
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
