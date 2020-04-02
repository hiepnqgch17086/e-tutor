import React from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

const RowOfDate = ({
  startDateString = '',
  dateString = '',
  setDateString = (dateString: string) => { }
}) => {
  const startDateStringArr = []
  const startDate = moment(startDateString)
  for (let index = 0; index < 7; index++) {
    startDateStringArr.push(startDate.format('YYYY-MM-DD'));
    startDate.add(1, 'day')
  }

  const onClickDateCell = (dString: string) => {
    setDateString(dString)
  }

  return (
    <div className="fc-row fc-week fc-widget-content fc-rigid">
      <div className="fc-bg">
        <table className="">
          <tbody>
            <tr>
              {
                startDateStringArr.map((dString, index) => {
                  // LOGIC
                  const isToday = dString === moment().format('YYYY-MM-DD')

                  const cellIsCurrentDate = dString === moment(dateString).format('YYYY-MM-DD')
                  const styleForCurrentDate = cellIsCurrentDate ? {
                    backgroundColor: '#ffff004f'
                  } : {}

                  const date = moment(dString).format('DD')
                  const isOtherMonth = moment(dateString).format('MM') !== moment(dString).format('MM')
                  // LOGIC
                  return (
                    <td key={index}
                      className={`fc-day fc-day-top fc-widget-content ${isToday && 'fc-today'} ${isOtherMonth && 'fc-other-month'}`}
                      data-date={dString}
                      style={{
                        cursor: 'pointer',
                        ...styleForCurrentDate
                      }}
                      onClick={() => onClickDateCell(dString)}
                    >
                      <span className="fc-day-number">{date}</span>
                    </td>
                  )
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default observer(RowOfDate)
