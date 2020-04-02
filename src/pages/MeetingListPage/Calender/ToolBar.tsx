import React from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

const ToolBar = ({
  dateString = moment().format(),
  setDateString = (dateString: string) => { }
}) => {

  const onPrevMonth = () => {
    const jj = moment(dateString).subtract(1, 'month')
    setDateString(jj.format())
    // console.log(jj.format())
  }

  const onNextMonth = () => {
    const jj = moment(dateString).add(1, 'month')
    setDateString(jj.format())
    // console.log(jj.format())
  }

  const onToday = () => {
    setDateString(moment().format())
  }

  return (
    <div className="fc-toolbar fc-header-toolbar">
      <div className="fc-right">
        <div className="fc-button-group">
          <button type="button" className="btn fc-prev-button fc-button fc-state-default fc-corner-left" aria-label="prev"
            style={{ outline: 'none' }}
            onClick={onPrevMonth}
          >
            <span className="fc-icon fc-icon-left-single-arrow" />
          </button>
          <button type="button" className="btn fc-next-button fc-button fc-state-default fc-corner-right" aria-label="next"
            style={{ outline: 'none' }}
            onClick={onNextMonth}
          >
            <span className="fc-icon fc-icon-right-single-arrow" />
          </button>
        </div>
        <button type="button" className="btn btn-primary fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-disabled"
          onClick={onToday}
        >today</button>
      </div>
      <div className="fc-left">
        <h2>{moment(dateString).format('MMMM YYYY')}</h2>
      </div>
      <div className="fc-clear" />
    </div>
  )
}

export default observer(ToolBar)
