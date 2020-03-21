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
    }
  }, [])

  return (
    <Container>
      <h1 className="mt-5">All users</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Name</th>
            <th>Dob</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>

          <MainList
            userArrayList={Data.users.items}
          />

        </tbody>
      </Table>
    </Container>
  )
}

export default observer(AllUsersPage)
