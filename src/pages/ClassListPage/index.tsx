import React from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import { Container } from 'reactstrap'
import BtnAddClass from './BtnAddClass'
import headerPageClasses from '../../reusable-classes/headerPageClasses'

const ClassListPage = () => {
  return (
    <Container>
      <h1 className={headerPageClasses}>Class List</h1>
      <BtnAddClass />
      <MainList />
    </Container>
  )
}

export default observer(ClassListPage)
