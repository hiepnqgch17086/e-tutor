import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUsers, defaultOfUser } from '../../models-one-entity/Users'

const MainList = ({
  userArrayList = defaultOfUsers.items
}) => {
  // console.log('userArrayList', userArrayList)
  return (
    <>
      {
        userArrayList.map((user, index) => (
          <UserItem
            item={user}
            index={index}
            key={user.id}
          />
        ))
      }
    </>
  )
}

export const UserItem = ({ item = defaultOfUser, index = 0 }) => {
  return <tr>
    <th scope="row">{index + 1}</th>
    <th>{item.email}</th>
    <th>{item.name}</th>
    <th>{item.dob}</th>
    <th>{item.phone}</th>
    <th>{item.address}</th>
    <th>{item.avatar}</th>
  </tr>
}

export default observer(MainList)
