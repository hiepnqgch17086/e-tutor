import React from 'react'
import { observer } from 'mobx-react-lite'
import Users, { defaultOfUser, defaultOfUsers } from '../../../models-one-entity/Users'
import { goStudentPage } from '../../../routes'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../../images/AvatarInDefault'

const TableOfMemberNotInteractive = ({
  users = defaultOfUsers
}) => {
  return (
    <CustomTable
      className="mb-2"
      headerArray={["Avatar", "Name", "Email", "Menu"]}
      data={users.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {
        return [
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.name,
          item.email,
          <ButtonGroup>
            <Button onClick={() => goStudentPage(item.id)}>
              Detail
            </Button>
          </ButtonGroup>
        ]
      }}
    />
  )
}

export default observer(TableOfMemberNotInteractive)
