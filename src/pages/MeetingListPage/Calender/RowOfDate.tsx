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
                  // LOGIC
                  return (
                    <td key={index} className={`fc-day fc-widget-content ${isToday && 'fc-today'}`} data-date={dString}
                      style={{
                        cursor: 'pointer',

                        ...styleForCurrentDate
                      }}
                      onClick={() => onClickDateCell(dString)}
                    />
                  )
                })
              }
            </tr>
          </tbody>
        </table>
      </div>

      <div className="fc-content-skeleton">
        <table>
          <tbody>
            <tr>
              {
                startDateStringArr.map((dString, index) => {
                  // const isToday = dateString === moment().format('YYYY-MM-DD')
                  const date = moment(dString).format('DD')
                  const isOtherMonth = moment(dateString).format('MM') !== moment(dString).format('MM')
                  return (
                    <td className={`fc-day-top ${isOtherMonth && 'fc-other-month'}`} data-date={dString} key={index}
                      style={{
                        cursor: 'pointer',
                        border: '1px solid red',
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
