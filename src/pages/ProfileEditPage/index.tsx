import React from 'react'
import MainForm from './MainForm'
import { observer } from 'mobx-react-lite'
import { Container } from 'reactstrap'

const SignUpPage = () => {
  return (
    <Container>
      <h1 className="mt-5">Register</h1>
      <MainForm />
    </Container>
  )
}

export default observer(SignUpPage)
