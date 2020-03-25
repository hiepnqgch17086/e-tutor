import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'

let timer: any = null
let input2: string = ''

const SearchBar = ({
  getDatabaseItems = () => { console.log('prop should pass') },
  setGlobalInput = (input: string) => { },
  setPage = (page: number) => { },
  placeholder = "Enter user's email"
}) => {

  const [input, setInput] = useState('')

  const onChangeInput = (e: any) => {
    setInput(e.target.value)
    input2 = e.target.value
    clearTimeout(timer)

    timer = setTimeout(() => {
      setPage(1)
      setGlobalInput(input2)
      getDatabaseItems()
    }, 500);
  }

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-magnifier" />
        </InputGroupText>
      </InputGroupAddon>
      <Input placeholder={placeholder}
        value={input}
        onChange={onChangeInput}
      />
    </InputGroup>
  )
}

export default observer(SearchBar)
