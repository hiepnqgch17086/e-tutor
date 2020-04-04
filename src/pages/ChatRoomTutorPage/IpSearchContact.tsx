import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomInput from '../../components-in-managing-resources/CustomInput'

const IpSearchContact = () => {
  return (
    <div className="card-body border-right">
      <CustomInput
        placeholder="Search contact"
      />
    </div>
  )
}

export default observer(IpSearchContact)
