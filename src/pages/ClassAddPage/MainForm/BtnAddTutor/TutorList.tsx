import React, { useEffect } from 'react'
import tutorsData from './data'
import { defaultOfUser } from '../../../../models-one-entity/Users'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../../components-in-managing-resources/CustomTable'
import { useHistory } from 'react-router-dom'
import { get_USER_PAGE } from '../../../../routes'
import { Button, ButtonGroup } from 'reactstrap'
import { getSnapshot } from 'mobx-state-tree'
import ClassAddPageData from '../../data'
import AvatarInDefault from '../../../../images/AvatarInDefault'

const TutorList = ({
  isModalVisible = false
}) => {
  const { tutor } = ClassAddPageData
  const { page, limit } = tutorsData

  let history = useHistory();

  useEffect(() => {
    // console.log('didmout')
    tutorsData.getDatabaseItemsWhoAreTutors()
  }, [page, limit])

  useEffect(() => {
    if (!isModalVisible) {
      // console.log(isModalVisible)
      tutorsData.setSnapshotNew({})
    }
  }, [isModalVisible])

  return (

    <CustomTable
      headerArray={["#", "Avatar", "Email", "Name", "Menu"]}
      data={tutorsData.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {

        const onGoDetailOfUser = () => {
          history.push(get_USER_PAGE(item.id))
        }

        const onChooseTutor = () => {
          tutor.setSnapshotNew(getSnapshot(item))
        }

        const onRemoveTutor = () => {
          tutor.setSnapshotNew({})
        }

        const isAdded = tutor.id === item.id

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
                    onClick={onRemoveTutor}
                    color="danger"
                    className="ml-1">
                    Remove
                  </Button>)
                  : (<Button
                    onClick={onChooseTutor}
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

export default observer(TutorList)
