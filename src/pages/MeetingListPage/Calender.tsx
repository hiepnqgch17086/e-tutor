import React from 'react'
import { observer } from 'mobx-react-lite'
import ToolBar from './Calender/ToolBar'
import TableHead from './Calender/TableHead'
import RowOfDate from './Calender/RowOfDate'
import moment from 'moment'

const Calender = ({
  dateString = moment().format(),
  startDateString = moment().format(),
  endDateString = moment().format(),
  setDateString = (dateString: string) => { }
}) => {

  const endDate = moment(endDateString)
  const startDate = moment(startDateString)
  let startDateStringList: any[] = []


  while (endDate > startDate) {
    startDateStringList.push(startDate.format())
    startDate.add(1, 'week')
  }

  return (
    <div className="card-body b-l calender-sidebar">
      <div className="card-body b-l calender-sidebar" style={{ padding: 0 }}>
        <div id="calendar" className="fc fc-unthemed fc-ltr">
          <ToolBar
            dateString={dateString}
            setDateString={setDateString}
          />
          <div className="fc-view-container" style={{}}>
            <div className="fc-view fc-month-view fc-basic-view" style={{}}>
              <table className="">
                <thead className="fc-head">
                  <tr>
                    <td className="fc-head-container fc-widget-header">
                      <div className="fc-row fc-widget-header">
                        <table className="">
                          <TableHead />
                        </table>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody className="fc-body">
                  <tr>
                    <td className="fc-widget-content">
                      <div className="fc-scroller fc-day-grid-container" style={{ overflow: 'hidden' }}>
                        <div className="fc-day-grid fc-unselectable">
                          {
                            startDateStringList.map((startDateString, index) => (
                              <RowOfDate
                                key={index} startDateString={startDateString} dateString={dateString}
                                setDateString={setDateString}
                              />
                            ))
                          }
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>


    </div>

  )
}

export default observer(Calender)
