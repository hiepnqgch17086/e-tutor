import React, { useEffect } from 'react'
import studentsData from './data'
import { defaultOfUser } from '../../../../models-one-entity/Users'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../../components-in-managing-resources/CustomTable'
import { useHistory } from 'react-router-dom'
import { get_USER_PAGE } from '../../../../routes'
import { Button, ButtonGroup } from 'reactstrap'
import ClassAddPageData from '../../data'
import { getSnapshot } from 'mobx-state-tree'
import AvatarInDefault from '../../../../images/AvatarInDefault'

const StudentList = ({
  isModalVisible = false
}) => {

  const { page, limit } = studentsData

  let history = useHistory();

  useEffect(() => {
    // console.log('didmout')
    studentsData.getDatabaseItemsWhoAreStudents()
  }, [page, limit])

  useEffect(() => {
    if (!isModalVisible) {
      // console.log(isModalVisible)
      studentsData.setSnapshotNew({})
    }
  }, [isModalVisible])

  const { joinedStudents } = ClassAddPageData

  return (

    <CustomTable
      headerArray={["#", "Avatar", "Email", "Name", "Menu"]}
      data={studentsData.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {

        const onGoDetailOfUser = () => {
          history.push(get_USER_PAGE(item.id))
        }

        const onAddStudent = () => {
          joinedStudents.setItemsToAdd(getSnapshot(item))
        }

        const onRemoveStudent = () => {
          joinedStudents.setItemsToRemove(item.id)
        }

        const isAdded = joinedStudents.items.findIndex(i => i.id === item.id) >= 0

        return [
          (page - 1) * limit + index + 1,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.email,
          item.name,
          <>
            <ButtonGroup size="sm">
              <Button onClick={onGoDetailOfUser}>
                Detail
              </Button>
              {
                isAdded
                  ? (<Button
                    onClick={onRemoveStudent}
                    color="danger"
                    className="ml-1">
                    Remove
                  </Button>)
                  : (<Button
                    onClick={onAddStudent}
                    color="primary"
                    className="ml-1">
                    Add
                  </Button>)
              }
            </ButtonGroup>
          </>
        ]
      }}
    />
  )
}

export default observer(StudentList)
