import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'

let timer: any = null
let email2: string = ''

const SearchBar = ({
  onSearchUsersByEmail = (email: string) => { console.log(email) }
}) => {

  const [email, setEmail] = useState('')

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
    email2 = e.target.value
    clearTimeout(timer)

    timer = setTimeout(() => {
      onSearchUsersByEmail(email2)
    }, 500);
  }

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-magnifier" />
        </InputGroupText>
      </InputGroupAddon>
      <Input placeholder="Enter user's email"
        value={email}
        onChange={onChangeEmail}
      />
    </InputGroup>
  )
}

export default observer(SearchBar)
