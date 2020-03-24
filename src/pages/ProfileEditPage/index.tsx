import React, { useEffect } from 'react'
import MainForm from './MainForm'
import { observer } from 'mobx-react-lite'
import { Container } from 'reactstrap'
import Data from './data'
import { Redirect } from 'react-router-dom'
import { PROFILE_PAGE } from '../../routes'
import headerPageClasses from '../../reusable-classes/headerPageClasses'

const SignUpPage = () => {
  const { cloneCurrentUser, onSaveForm, shouldRedirectToProfilePage } = Data
  useEffect(() => {
    // effect
    Data.onDidMount()
    return () => Data.onWillUnMount()
  }, [])
  return (
    <Container>
      <h1 className={headerPageClasses}>Edit profile</h1>
      <MainForm
        cloneCurrentUser={cloneCurrentUser}
        onSaveForm={onSaveForm}
      />
      {
        shouldRedirectToProfilePage && (
          <Redirect to={PROFILE_PAGE} />
        )
      }
    </Container>
  )
}

export default observer(SignUpPage)
