import React, { useEffect } from 'react'
import MainForm from './MainForm'
import Data from './data'
import { observer } from 'mobx-react-lite'

const UserAddPage = () => {
  const { user, onSaveForm } = Data
  useEffect(() => {
    // effect
    return () => {
      Data.onWillUnMount()
    }
  }, [])
  return (
    <div>
      <MainForm user={user} onSaveForm={onSaveForm} />
    </div>
  )
}

export default observer(UserAddPage)
