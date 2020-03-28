import React from 'react'

const CustomIconPlus = ({
  onClick = () => { },

}) => {
  return (
    <div onClick={onClick} className="ml-1 mr-1"
      style={{
        cursor: 'pointer',
        display: 'inline',
      }}

    >
      <i className="icon-plus" />
    </div>
  )
}

export default CustomIconPlus
