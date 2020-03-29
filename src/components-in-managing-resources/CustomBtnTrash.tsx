import React from 'react'
import { Button } from 'reactstrap'
import { observer } from 'mobx-react-lite'

const CustomBtnTrash = ({
  onClick = () => { },
  className = "",
  disabled = false
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      color="danger"
      className={className}>
      <i className="icon-trash" />
    </Button>
  )
}

export default observer(CustomBtnTrash)
