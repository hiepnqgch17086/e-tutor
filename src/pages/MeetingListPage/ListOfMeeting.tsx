import React from 'react'
import { observer } from 'mobx-react-lite'
import Meeting from '../../components-for-meeting/index'

const ListOfMeeting = () => {
  const demolist = ['Meeting One', 'Meeting Two', 'Meeting Three', 'Meeting Four']
  const style = { paddingRight: '0px' }
  return (
    <>
      <div className="card-body border-bottom" style={style}>
        <h4 className="card-title mt-2">List of meetings</h4>
      </div>
      <div className="card-body" style={style}>
        <div className="row">
          <div className="col-md-12">
            <div id="calendar-events" className="">
              {
                demolist.map((item, index) => {
                  return <Meeting key={index} item={item} />
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
