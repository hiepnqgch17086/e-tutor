import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'

const ProfilePage = () => {
  return (
    <div>
      {JSON.stringify(Data.currentUser)}
    </div>
  )
}

export default observer(ProfilePage)
