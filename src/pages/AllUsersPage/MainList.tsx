import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUsers, defaultOfUser } from '../../models-one-entity/Users'
import { IS_ADMIN, IS_STUDENT, IS_TUTOR } from '../../models-one-prop/role'

const MainList = ({
  userArrayList = defaultOfUsers.items
}) => {
  // console.log('userArrayList', userArrayList)
  return (
    <div className="card">

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Dob</th>
              <th>Phone</th>
              {/* <th>Address</th> */}
              <th>Avatar</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>

            {
              userArrayList.map((user, index) => (
                <UserItemObserver
                  item={user}
                  index={index}
                  key={user.id}
                />
              ))
            }

          </tbody>


        </table>
      </div>

    </div>
  )
}

export const UserItem = ({ item = defaultOfUser, index = 0 }) => {

  const onChangeRole = (e: any) => {
    item.setRole(parseInt(e.target.value))
    // console.log(e.target.value)
    item.setDatabaseUpdateProfile()
  }

  return <tr>
    <th scope="row">{index + 1}</th>
    <th>{item.email}</th>
    <th>{item.name}</th>
    <th>{item.dob}</th>
    <th>{item.phone}</th>
    {/* <th>{item.address}</th> */}

    <th>
      <img src={item.avatar} alt="user" className="rounded-circle" width={70} height={70} />
    </th>
    <th>
      <select className="form-control" id="exampleFormControlSelect1"
        value={item.role}
        onChange={onChangeRole}
        style={{ minWidth: '120px' }}
      >
        <option value={IS_ADMIN}>Admin</option>
        <option value={IS_TUTOR}>Tutor</option>
        <option value={IS_STUDENT}>Student</option>
      </select>
    </th>
  </tr>

}

const UserItemObserver = observer(UserItem)

export default observer(MainList)
