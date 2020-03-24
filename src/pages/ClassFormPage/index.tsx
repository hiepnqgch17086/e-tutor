import React from 'react'
import { observer } from 'mobx-react-lite'
import MainForm from './MainForm'
import BtnBackToList from './BtnBackToList'
import { Container } from 'reactstrap'

const ClassFormPage = () => {
  return (
    <Container>
      <h1>Class Form Page</h1>
      <BtnBackToList />
      <MainForm />
    </Container>
  )
}

export default observer(ClassFormPage)
