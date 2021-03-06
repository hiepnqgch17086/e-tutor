import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser, defaultOfUsers } from '../../../models-one-entity/Users'
import { goStudentPage } from '../../../routes'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../../images/AvatarInDefault'
import BtnChangeTutor from './BtnChangeTutor'
import { IS_STUDENT, IS_TUTOR } from '../../../models-one-prop/role'

const MainList = ({
  users = defaultOfUsers
}) => {
  const { page, limit } = users
  // console.log(users)
  return (
    <CustomTable
      className="mb-2"
      headerArray={["#", "Avatar", "Name", "Email", "Role", "Tutor name", "Menu"]}
      data={users.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {
        return [
          (page - 1) * limit + index + 1,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.name,
          item.email,
          item.role === IS_STUDENT ? 'Student' : item.role === IS_TUTOR ? 'Tutor' : 'Other',
          <div>
            {item.tutorId === null ? '' : item.tutorId.name}
            <BtnChangeTutor className="ml-1" student={item} />
          </div>,
          <ButtonGroup>
            <Button onClick={() => goStudentPage(item.id)} size="sm">
              Detail
            </Button>
          </ButtonGroup>
        ]
      }}
    />
  )
}

export default observer(MainList)
