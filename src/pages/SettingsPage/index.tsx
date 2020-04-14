import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfilePageData from '../ProfilePage/data'
import { IS_ADMIN } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
import Data from './data'

const SettingsPage = () => {
  const { currentUser } = ProfilePageData
  const history = useHistory()
  const { numberOfStudentsPerTutor } = Data

  useEffect(() => {
    // validate for ADMIN
    if (currentUser.role === IS_ADMIN) {
      Data.getDatabaseNumberOfStudentsPerTutor()
    } else {
      history.push(HOME_PAGE)
    }
  }, [history, currentUser.role])
  return (
    <div>
      AdminSettingsPage: {numberOfStudentsPerTutor}
    </div>
  )
}

export default observer(SettingsPage)
