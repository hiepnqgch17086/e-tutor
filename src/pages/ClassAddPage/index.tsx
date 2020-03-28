import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainForm from './MainForm'
import Data from './data'

const ClassAddPage = () => {
  useEffect(() => {
    return () => {
      Data.onWillUnMount()
    }
  }, [])
  return (
    <>
      <MainForm />
    </>
  )
}

export default observer(ClassAddPage)
