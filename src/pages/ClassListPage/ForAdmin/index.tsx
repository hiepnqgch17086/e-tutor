import React from 'react'
import { observer } from 'mobx-react-lite'
import BtnAddClass from './BtnAddClass'
import MainList from './MainList'

const ForAdmin = () => {
  return (
    <div>
      <BtnAddClass />
      <MainList />
    </div>
  )
}

export default observer(ForAdmin)
