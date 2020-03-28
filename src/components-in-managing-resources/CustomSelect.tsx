import React from 'react'
import { Input } from 'reactstrap'
import { observer } from 'mobx-react-lite'

type L = {
  value?: string,
  label?: string,
}

type Props = {
  error?: boolean | null,
  value?: string | number,
  onChangeText?: Function,
  placeholder?: string,
  type?: string,
  data?: Array<L>,
}

const CustomSelect = ({
  error = null,
  value = "",
  onChangeText = (value: string) => { },
  data = []
}: Props) => {

  data.unshift({
    value: "",
    label: "Select one"
  })

  return (
    <Input type="select" name="select"
      className={`${error === false && 'is-valid'} ${error === true && 'is-invalid'}`}
      value={value}
      onChange={(e) => {
        onChangeText(e.target.value)
      }}
    >
      {
        data.map((item, index) => (
          <option value={item.value} key={index}>{item.label}</option>
        ))
      }
    </Input>
  )
}

export default observer(CustomSelect)
