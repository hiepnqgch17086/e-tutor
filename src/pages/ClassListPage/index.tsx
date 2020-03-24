import React from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import { Container } from 'reactstrap'

const ClassListPage = () => {
  return (
    <Container>
      <h1 className="mt-5">Class List</h1>
      <MainList />
    </Container>
  )
}

export default observer(ClassListPage)
