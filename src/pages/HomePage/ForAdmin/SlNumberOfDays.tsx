import React from 'react'
import { observer } from 'mobx-react-lite'

const SlNumberOfDays = ({
  setNumberOfDay = (numberOfDays: number) => { },
  numberOfDays = 7,
  className = "mb-2"
}) => {

  const onChange = (e: any) => {
    setNumberOfDay(parseInt(e.target.value))
  }

  return (
    <select className={`form-control ${className}`} id="exampleFormControlSelect1"
      value={numberOfDays}
      onChange={onChange}
      style={{ maxWidth: '120px' }}
    >
      <option value={7}>in 7 days</option>
      <option value={28}>in 28 days</option>
    </select>
  )
}

export default observer(SlNumberOfDays)
