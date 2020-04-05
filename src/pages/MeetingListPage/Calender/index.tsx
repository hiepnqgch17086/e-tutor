import React from 'react'
import { observer } from 'mobx-react-lite'
import ToolBar from './ToolBar'
import TableHead from './TableHead'
import RowOfDate from './RowOfDate'
import moment from 'moment'

const Calender = ({
  dateString = moment().format(),
  fromAt = moment().format(),
  toAt = moment().format(),
  setDateString = (dateString: string) => { }
}) => {

  const toDate = moment(toAt)
  const fromDate = moment(fromAt)
  let sundayStringList: any[] = []


  while (toDate > fromDate) {
    sundayStringList.push(fromDate.format())
    fromDate.add(1, 'week')
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
                    <td>
                      {
                        sundayStringList.map((sundayString, index) => (
                          <RowOfDate
                            key={index}
                            sundayString={sundayString} dateString={dateString}
                            setDateString={setDateString}
                          />
                        ))
                      }
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
