import React, { useEffect } from 'react'
import MainForm from './MainForm'
import { observer } from 'mobx-react-lite'
import Data from './data'
import { Redirect } from 'react-router-dom'
import { PROFILE_PAGE } from '../../routes'

const SignUpPage = () => {
  const { cloneCurrentUser, onSaveForm, shouldRedirectToProfilePage } = Data
  useEffect(() => {
    // effect
    Data.onDidMount()
    return () => Data.onWillUnMount()
  }, [])
  return (
    <>
      <MainForm
        user={cloneCurrentUser}
        onSaveForm={onSaveForm}
      />
      {
        shouldRedirectToProfilePage && (
          <Redirect to={PROFILE_PAGE} />
        )
      }
    </>
  )
}

export default observer(SignUpPage)
