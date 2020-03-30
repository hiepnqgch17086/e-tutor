import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'

let timer: any = null
let input2: string = ''

/**
 * 
 * @param setGlobalInput: set input out-side of component 
 * @param setPage: set page 1st when enter new input 
 * @param getDatabaseItems: call api
 */
const SearchBar = ({
  getDatabaseItems = () => { console.log('prop should pass') },
  setGlobalInput = (input: string) => { },
  setPage = (page: number) => { },
  placeholder = "Enter user's email",
  className = "mb-2"
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
    <InputGroup className={`${className}`}>
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
