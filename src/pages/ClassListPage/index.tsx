import React from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import { Container } from 'reactstrap'
import BtnAddClass from './BtnAddClass'

const ClassListPage = () => {
  return (
    <Container>
      <h1>Class List</h1>
      <BtnAddClass />
      <MainList />
    </Container>
  )
}

export default observer(ClassListPage)
