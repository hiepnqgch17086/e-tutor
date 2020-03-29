import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUsers, defaultOfUser } from '../../models-one-entity/Users'
import { IS_ADMIN, IS_STUDENT, IS_TUTOR } from '../../models-one-prop/role'
import { get_USER_PAGE, goUserPage } from '../../routes'
import { useHistory } from "react-router-dom";
import CustomTable from '../../components-in-managing-resources/CustomTable'
import { Button } from 'reactstrap'
import AvatarInDefault from '../../images/AvatarInDefault'

const MainList = ({
  users = defaultOfUsers,
  page = 1,
  limit = 10,
}) => {

  let history = useHistory();

  useEffect(() => {
    users.getDatabaseItems()
  }, [page, limit])

  return (
    <CustomTable
      headerArray={["#", "Email", "Name", "Dob", "Phone", "Avatar", "Role", "Menu"]}
      data={users.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {

        const onChangeRole = (e: any) => {
          item.setRole(parseInt(e.target.value))
          // console.log(e.target.value)
          item.setDatabaseUpdateRole()
        }

        return [
          (page - 1) * limit + index + 1,
          item.email,
          item.name,
          item.dob,
          item.phone,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          <select className="form-control" id="exampleFormControlSelect1"
            value={item.role}
            onChange={onChangeRole}
            style={{ minWidth: '120px' }}
          >
            <option value={IS_ADMIN}>Admin</option>
            <option value={IS_TUTOR}>Tutor</option>
            <option value={IS_STUDENT}>Student</option>
          </select>,
          <Button onClick={() => goUserPage(item.id)}>
            Detail
          </Button>
        ]
      }}
    />
  )
}

export default observer(MainList)
