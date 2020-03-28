import React from 'react'
import { Input } from 'reactstrap'
import { observer } from 'mobx-react-lite'

type Props = {
  error?: boolean | null,
  value?: string,
  onChangeText?: Function,
  placeholder?: string
}

const CustomInput = ({
  error = null || false,
  value = '',
  onChangeText = (text: string) => { },
  placeholder = ""
}: Props) => {
  return (
    <Input
      className={`${error === false && 'is-valid'} ${error === true && 'is-invalid'}`}
      value={value}
      onChange={e => onChangeText(e.target.value)}
      type="text" name="text" id="title" placeholder={placeholder}
    />
  )
}

export default observer(CustomInput)
