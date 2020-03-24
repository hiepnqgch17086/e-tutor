import React from 'react'
import { observer } from 'mobx-react-lite'
import MainForm from './MainForm'

const ClassFormPage = () => {
  return (
    <>
      <MainForm />
    </>
  )
}

export default observer(ClassFormPage)
