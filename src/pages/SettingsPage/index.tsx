import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfilePageData from '../ProfilePage/data'
import { IS_ADMIN } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
import Data from './data'
// import { Button } from 'reactstrap'
import NumberOfStudentsPerTutor from './NumberOfStudentsPerTutor'

const SettingsPage = () => {
  const { currentUser } = ProfilePageData
  const history = useHistory()
  const { numberOfStudentsPerTutor } = Data

  useEffect(() => {
    // validate for ADMIN: load base data in index.tsx
    if (currentUser.role !== IS_ADMIN) {
      history.push(HOME_PAGE)
    }
  }, [history, currentUser.role])
  return (
    <div className="card">
      <div className="card-body">
        <NumberOfStudentsPerTutor
          info={numberOfStudentsPerTutor}
        />
      </div>
    </div>
  )
}

export default observer(SettingsPage)
