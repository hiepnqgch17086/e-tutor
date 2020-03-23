import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUsers } from '../../models-one-entity/Users'

const MainList = ({
  userArrayList = defaultOfUsers.items
}) => {
  console.log('userArrayList', userArrayList)
  let count = 1
  return (
    <>
      {
        userArrayList.map((user, index) => (
          <tr key={user.id || index}>
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
