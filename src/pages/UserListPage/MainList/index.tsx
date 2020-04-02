import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Users, { defaultOfUser } from '../../../models-one-entity/Users'
import { goUserPage } from '../../../routes'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../../images/AvatarInDefault'
import IconChangeTutor from './IconChangeTutor'
import { IS_STUDENT, IS_TUTOR } from '../../../models-one-prop/role'
import { useHistory } from 'react-router-dom'

const MainList = ({
  users = Users.create({
    items: [
      {
        id: 1,
        avatar: '',
        email: 'student1@example.com',
        name: 'student1',
        role: 3
      }
    ]
  }),
  page = 1,
  limit = 10,
}) => {

  const history = useHistory()

  useEffect(() => {
  }, [page, limit])

  return (
    <CustomTable
      className="mb-2"
      headerArray={["#", "Avatar", "Name", "Email", "Role", "Tutor email", "Menu"]}
      data={users.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {
        return [
          (page - 1) * limit + index + 1,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.name,
          item.email,
          item.role === IS_STUDENT ? 'Student' : item.role === IS_TUTOR ? 'Tutor' : 'Other',
          <div>
            "tutor1@example.com"
            <IconChangeTutor className="ml-1" />
          </div>,
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
