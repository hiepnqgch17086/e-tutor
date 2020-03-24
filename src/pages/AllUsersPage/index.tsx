import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Table } from 'reactstrap'
import MainList from './MainList'
import Data from './data'

const AllUsersPage = () => {

  useEffect(() => {
    // effect
    Data.onDidMount()
    return () => {
      // cleanup
      Data.onWillUnMount()
    }
  }, [])

  return (
    <div className="card">
      <MainList
        userArrayList={Data.users.items}
      />
    </div>
  )
}

export default observer(AllUsersPage)
