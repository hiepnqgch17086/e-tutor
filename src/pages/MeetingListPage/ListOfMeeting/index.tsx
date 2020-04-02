import React from 'react'
import { observer } from 'mobx-react-lite'
import ListItemOfMeeting from './ListItemOfMeeting'
import moment from 'moment'
import BtnAddMeeting from './BtnAddMeeting'

const ListOfMeeting = ({
  dateString = ''
}) => {
  const demolist: any[] = ['', '', '', '']
  const style = { paddingRight: '0px' }
  return (
    <>
      {/* <div className="card-body border-bottom" style={style}>
      </div> */}
      <div className="card-body" style={style}>
        <div className="card-title mt-2">{moment(dateString).format('dddd DD-MM-YYYY')}</div>
        <div className="row">
          <div className="col-md-12">
            <div id="calendar-events" className="">
              {
                demolist.map((item, index) => {
                  return <ListItemOfMeeting key={index} item={item} />
                })
              }
              <BtnAddMeeting dateString={dateString} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(ListOfMeeting)
