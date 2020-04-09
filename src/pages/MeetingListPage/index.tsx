import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ListOfMeeting from './ListOfMeeting'
import Calender from './Calender'
import moment from 'moment'
import Data from './data'
import TableOfMeetingByPagination from './TableOfMeetingByPagination'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'

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
    <>
      <div className="card">
        <div className="row">
          <div className="col-md-8">
            <Calender
              dateString={dateString}
              fromAt={fromAt}
              toAt={toAt}
              setDateString={setDateString}
            />
          </div>
          <div className="col-md-4">
            <ListOfMeeting
              dateString={dateString}
            // fromAt={fromAt}
            // toAt={toAt}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="row">


          <div className="col-md-12">
            <div className="card-body p-2">
              <h4 className="card-title">All Meetings</h4>
            </div>
            <div className="m-2 mt-0">
              <SearchBar
                setPropInput={(text: string) => {
                  Data.meetingsByPagination.setTextContains(text)
                  Data.onTitleSearchChange()
                }}
                placeholder="meeting's title"
              />
            </div>
            <TableOfMeetingByPagination
              meetings={Data.meetingsByPagination}
            />
            <div className="d-flex justify-content-center">
              <PaginationBar
                page={Data.meetingsByPagination.page}
                setPage={(pageNumber: number) => {
                  Data.meetingsByPagination.setPage(pageNumber)
                  Data.onPageChange()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(MeetingPage)
