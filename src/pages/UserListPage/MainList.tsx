import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUsers, defaultOfUser } from '../../models-one-entity/Users'
import { IS_ADMIN, IS_STUDENT, IS_TUTOR } from '../../models-one-prop/role'
import { get_USER_PAGE, goUserPage } from '../../routes'
import { useHistory } from "react-router-dom";
import CustomTable from '../../components-in-managing-resources/CustomTable'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../images/AvatarInDefault'
import SlRole from './MainList/SlRole'
import CustomBtnTrash from '../../components-in-managing-resources/CustomBtnTrash'
import BtnTrash from './MainList/BtnTrash'

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

        const onRemoveUser = () => {

        }

        return [
          (page - 1) * limit + index + 1,
          item.email,
          item.name,
          item.dob,
          item.phone,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          <SlRole item={item} />,
          <ButtonGroup>
            <Button onClick={() => goUserPage(item.id)}>
              Detail
            </Button>
            <BtnTrash item={item} />
          </ButtonGroup>
        ]
      }}
    />
  )
}

export default observer(MainList)
