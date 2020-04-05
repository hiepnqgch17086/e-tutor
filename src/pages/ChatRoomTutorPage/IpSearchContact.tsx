import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import CustomInput from '../../components-in-managing-resources/CustomInput'
import Data from './data'

let timer: any = null
let input2: string = ''

const IpSearchContact = () => {
  const { rooms } = Data
  const [input, setInput] = useState(rooms.textContains)

  const onChangeInput = (text: string) => {
    setInput(text)
    input2 = text
    clearTimeout(timer)
    timer = setTimeout(() => {
      rooms.setTextContains(input2)
    }, 500);
  }

  return (
    <div className="card-body">
      <CustomInput
        placeholder="Search contact"
        value={input}
        onChangeText={onChangeInput}
      />
    </div>
  )
}

export default observer(IpSearchContact)
