import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUsers, defaultOfUser } from '../../models-one-entity/Users'
import { values } from 'mobx'

const MainList = ({
  userArrayList = defaultOfUsers.items
}) => {
  console.log('userArrayList', userArrayList)
  let count = 1
  return (
    <>
      {
        userArrayList.map(user => (
          <tr key={user.id}>
            <th scope="row">{count++}</th>
            <th>{user.email}</th>
            <th>{user.name}</th>
            <th>{user.dob}</th>
            <th>{user.phone}</th>
            <th>{user.address}</th>
            <th>{user.avatar}</th>
          </tr>
        ))
      }
    </>
  )
}

export default observer(MainList)