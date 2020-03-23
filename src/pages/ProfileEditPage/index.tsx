import React, { useEffect } from 'react'
import MainForm from './MainForm'
import { observer } from 'mobx-react-lite'
import { Container } from 'reactstrap'
import Data from './data'

const SignUpPage = () => {
  const { cloneCurrentUser, onSaveForm, shouldRedirectToProfilePage } = Data
  useEffect(() => {
    // effect
    Data.onDidMount()
    return () => Data.onWillUnMount()
  }, [])
  return (
    <Container>
      <h1 className="mt-5">Edit profile</h1>
      <MainForm
        cloneCurrentUser={cloneCurrentUser}
        onSaveForm={onSaveForm}
        shouldRedirectToProfilePage={shouldRedirectToProfilePage}
      />
    </Container>
  )
}

export default observer(SignUpPage)
