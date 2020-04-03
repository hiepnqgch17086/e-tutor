import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Users, { defaultOfUser, defaultOfUsers } from '../../../models-one-entity/Users'
import { goUserPage } from '../../../routes'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../../images/AvatarInDefault'
import { IS_STUDENT, IS_TUTOR } from '../../../models-one-prop/role'

const MainList = ({
  users = defaultOfUsers
}) => {
  const { page, limit } = users
  // console.log(users)
  return (
    <CustomTable
      className="mb-2"
      headerArray={["#", "Avatar", "Name", "Email", "Role", "Menu"]}
      data={users.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {
        return [
          (page - 1) * limit + index + 1,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.name,
          item.email,
          item.role === IS_STUDENT ? 'Student' : item.role === IS_TUTOR ? 'Tutor' : 'Other',
          <ButtonGroup>
            <Button onClick={() => goUserPage(item.id)}>
              Detail
            </Button>
          </ButtonGroup>
        ]
      }}
    />
  )
}

export default observer(MainList)
