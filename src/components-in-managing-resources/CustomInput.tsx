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
  disabled?: boolean
}

const CustomInput = ({
  error = false || null,
  value = '',
  onChangeText = (text: string) => { },
  placeholder = "",
  type = "text",
  id,
  disabled = false,
}: Props) => {
  const idProp = id ? { id } : {}
  return (
    <Input
      disabled={disabled}
      className={`${error === false && 'is-valid'} ${error === true && 'is-invalid'}`}
      value={value}
      onChange={e => onChangeText(e.target.value)}
      // type="datetime-local"
      // @ts-ignore
      type={type}
      data-date-format="DD-MM-YYYY HH:mm:ss"
      name="text" placeholder={placeholder}
      {...idProp}
    />
  )
}

export default observer(CustomInput)
