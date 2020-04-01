import React from 'react'
import { observer } from 'mobx-react-lite'
import ListOfMeeting from './ListOfMeeting'
import Calender from './Calender'

const MeetingPage = () => {
  const style = {}
  return (
    <div className="card">
      <div className="row">
        <div className="col-lg-2" style={style}>
          <ListOfMeeting />
        </div>
        <div className="col-lg-10" style={style}>
          <Calender />
        </div>
      </div>
    </div>
  )
}

export default observer(MeetingPage)
