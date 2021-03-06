import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MeetingItem from './MeetingItem'
import moment from 'moment'
import BtnAddMeeting from './BtnAddMeeting'
import Data from '../data'
// import useSubscribeMeetingInRangeOfDate from '../../../hooks/useSubscribeMeetingInRangeOfDate'

const ListOfMeeting = ({
  // fromAt = '',
  // toAt = '',
  dateString = ''
}) => {
  const { meetings, setComponent_ListOfMeeting_onDidMountDidUpdate, setComponent_ListOfMeeting_onWillUnMount } = Data
  const format1 = moment(dateString).format('YYYY-MM-DD')
  const style = { paddingRight: '0px' }

  // const { setSubscribeMeeting, setUnSubscribeMeeting } = useSubscribeMeetingInRangeOfDate({
  //   fromAt,
  //   toAt,
  //   setMeetingCreated: (meeting: Object) => {
  //     meetings.setMeetingAdded(meeting)
  //   },
  //   setMeetingUpdated: (meeting: Object) => {
  //     meetings.setMeetingUpdateStartAtEndAt(meeting)
  //   }
  // })

  useEffect(() => {
    // setUnSubscribeMeeting()
    // setSubscribeMeeting()
    setComponent_ListOfMeeting_onDidMountDidUpdate()
    // effect
    return () => {
      // setUnSubscribeMeeting()
      setComponent_ListOfMeeting_onWillUnMount()
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      {/* <div className="card-body border-bottom" style={style}>
      </div> */}
      <div className="card-body" style={style}>
        <div className="card-title mt-2">{moment(dateString).format('dddd DD-MM-YYYY')}</div>
        <div className="row">
          <div className="col-md-12">
            <div id="calendar-events" className="">
              <BtnAddMeeting dateString={dateString} />
              <div className="mt-2" />
              {
                meetings.items.filter(item => {
                  const format2 = moment(item.startAt).format('YYYY-MM-DD')
                  const format3 = moment(item.endAt).format('YYYY-MM-DD')
                  if (format1 >= format2 && format1 <= format3) {
                    return true
                  }
                  return false
                })
                  .slice()
                  .sort((a, b) => {
                    const startAtA = a.startAt
                    const startAtB = b.startAt
                    if (startAtA > startAtB) return 1
                    if (startAtA < startAtB) return -1
                    return 0
                  })
                  .map((item, index) => {
                    return <MeetingItem key={index} item={item} />
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(ListOfMeeting)
