import React from 'react'
import { Input } from 'reactstrap'
import { observer } from 'mobx-react-lite'

type Props = {
  error?: boolean | null,
  value?: string | number,
  onChangeText?: Function,
  placeholder?: string,
  type?: string,
  id?: string,
}

const CustomInput = ({
  error = null || false,
  value = '',
  onChangeText = (text: string) => { },
  placeholder = "",
  type = "text",
  id,
}: Props) => {
  const idProp = id ? { id } : {}
  return (
    <Input
      className={`${error === false && 'is-valid'} ${error === true && 'is-invalid'}`}
      value={value}
      onChange={e => onChangeText(e.target.value)}
      // @ts-ignore
      type={type} name="text" placeholder={placeholder}
      {...idProp}
    />
  )
}

export default observer(CustomInput)
