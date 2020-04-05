import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomInput from '../../components-in-managing-resources/CustomInput'
import Data from './data'

const IpSearchContact = () => {
  const { rooms } = Data
  return (
    <div className="card-body">
      <CustomInput
        placeholder="Search contact"
        value={rooms.textContains}
        onChangeText={rooms.setTextContains}
      />
    </div>
  )
}

export default observer(IpSearchContact)
