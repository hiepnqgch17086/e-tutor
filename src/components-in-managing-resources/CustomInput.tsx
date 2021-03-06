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
  disabled?: boolean,
  onPressEnter?: Function,
}

const CustomInput = ({
  error = false || null,
  value = '',
  onChangeText = (text: string) => { },
  onPressEnter = () => { },
  placeholder = "",
  type = "text",
  id,
  disabled = false,
}: Props) => {
  const idProp = id ? { id } : {}
  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      onPressEnter()
    }
  }
  return (
    <Input
      onKeyUp={onKeyUp}
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
