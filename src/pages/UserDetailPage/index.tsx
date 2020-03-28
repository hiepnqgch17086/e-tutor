import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ProfileDetail from '../ProfilePage/ProfileDetail'
import Data from './data'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'


const UserDetailPage = () => {
  const { user } = Data
  const { id = "" } = useParams()
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    user.setId(id)
    user.getDatabase()
  }, [])
  // console.log('ss', id)
  return (
    <div>
      {
        user.email ? (
          <ProfileDetail
            user={user}
          />
        ) : null
      }
      <Button onClick={goBack}>
        Back
      </Button>
    </div>
  )
}

export default observer(UserDetailPage)
