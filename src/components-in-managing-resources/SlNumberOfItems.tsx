import React from 'react'
import { observer } from 'mobx-react-lite'

const SlNumberOfItems = ({
  limit = 5,
  setLimit = (limit: number) => { },
  className = "mb-2"
}) => {
  const onChange = (e: any) => {
    // console.log(e.target.value)
    setLimit(parseInt(e.target.value))
  }


  return (
    <select className={`form-control ${className}`} id="exampleFormControlSelect1"
      value={limit}
      onChange={onChange}
      style={{ maxWidth: '120px' }}
    >
      <option value={5}>5 items</option>
      <option value={10}>10 items</option>
      <option value={20}>20 items</option>
      <option value={30}>30 items</option>
    </select>
  )
}

export default observer(SlNumberOfItems)
