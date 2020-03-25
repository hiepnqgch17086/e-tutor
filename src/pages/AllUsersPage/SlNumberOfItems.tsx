import React from 'react'

const SlNumberOfItems = ({
  limit = 10,
  setLimit = (limit: number) => { }
}) => {
  const onChange = (e: any) => {
    setLimit(parseInt(e.target.value))
  }
  return (
    <select className="form-control" id="exampleFormControlSelect1"
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

export default SlNumberOfItems
