import React from 'react'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { defaultOfUsers, defaultOfUser } from '../../../models-one-entity/Users'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../../images/AvatarInDefault'
import CustomBtnTrash from '../../../components-in-managing-resources/CustomBtnTrash'

const ListOfJoinedStudents = ({
  joinedStudents = defaultOfUsers
}) => {
  return (
    <CustomTable
      headerArray={["#", "Avatar", "Email", "Name", "Menu"]}
      data={joinedStudents.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {

        const onRemoveStudent = () => {
          joinedStudents.setItemsToRemove(item.id)
        }

        return [
          index + 1,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.email,
          item.name,
          <>
            <ButtonGroup size="sm">
              <Button onClick={() => { }}>
                Detail
              </Button>
              <CustomBtnTrash
                onClick={onRemoveStudent}
                className="ml-1"
              />
            </ButtonGroup>
          </>
        ]
      }}
    />
  )
}

export default ListOfJoinedStudents