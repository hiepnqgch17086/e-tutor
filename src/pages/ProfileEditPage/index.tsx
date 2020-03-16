import React, { useEffect } from 'react'
import MainForm from './MainForm'
import { observer } from 'mobx-react-lite'
import { Container } from 'reactstrap'
import Data from './data'

const SignUpPage = () => {
  const { cloneCurrentUser, onSaveForm } = Data
  useEffect(() => {
    // effect
    Data.onDidMount()
  }, [])
  return (
    <Container>
      <h1 className="mt-5">Register</h1>
      <MainForm
        cloneCurrentUser={cloneCurrentUser}
        onSaveForm={onSaveForm}
      />
    </Container>
  )
}

export default observer(SignUpPage)
