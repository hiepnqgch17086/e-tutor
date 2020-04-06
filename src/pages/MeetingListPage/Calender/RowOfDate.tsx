import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { Button } from 'reactstrap'
import MeetingListPageData from '../data'

const RowOfDate = ({
  sundayString = '',
  dateString = '',
  setDateString = (dateString: string) => { }
}) => {


  const daysInWeekString = []
  const startDate = moment(sundayString)
  for (let index = 0; index < 7; index++) {
    daysInWeekString.push(startDate.format('YYYY-MM-DD'));
    startDate.add(1, 'day')
  }

  return (
    <div className="fc-row fc-week fc-widget-content fc-rigid">
      <div className="fc-bg">
        <table className="">
          <tbody>
            <tr>
              {
                daysInWeekString.map((dString, index) => {
                  const isToday = dString === moment().format('YYYY-MM-DD')
                  const isCurrenDate = dString === moment(dateString).format('YYYY-MM-DD')
                  const isOtherMonth = moment(dateString).format('MM') !== moment(dString).format('MM')

                  return <CellOfDateObserver key={dString} dString={dString} setDateString={setDateString}
                    isToday={isToday}
                    isCurrenDate={isCurrenDate}
                    isOtherMonth={isOtherMonth}
                  />
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CellOfDate = ({
  dString = '',
  setDateString = (dString: string) => { },
  isToday = false,
  isCurrenDate = false,
  isOtherMonth = false,
}) => {
  const { meetings } = MeetingListPageData
  const [meetingCount, setMeetingCount] = useState(0)

  useEffect(() => {
    // effect
    const { count } = meetings.getMeetingListInfoInADay(dString)
    if (meetingCount !== count) setMeetingCount(count)
    // for first loading, and for added meeting
    // eslint-disable-next-line
  }, [JSON.stringify(meetings.items[0]), meetings.items.length])

  const styleForCurrentDate = isCurrenDate ? {
    backgroundColor: '#ffff004f'
  } : {}

  const styleForToDay = isToday ? {
    backgroundColor: '#3250e22e'
  } : {}

  const date = moment(dString).format('DD')

  // LOGIC
  return (
    <td
      className={`fc-day fc-day-top fc-widget-content ${isOtherMonth && 'fc-other-month'}`}
      data-date={dString}
      style={{
        cursor: 'pointer',
        ...styleForToDay,
        ...styleForCurrentDate
      }}
      onClick={() => setDateString(dString)}
    >
      <span className="fc-day-number">{date}</span>
      <div style={{
        height: '100%',
        width: '100%',
      }} className="d-flex justify-content-center">
        {
          meetingCount ? (
            <Button color="success">
              {meetingCount}
            </Button>
          ) : null
        }
      </div>
    </td>
  )
}

const CellOfDateObserver = observer(CellOfDate)

export default observer(RowOfDate)
