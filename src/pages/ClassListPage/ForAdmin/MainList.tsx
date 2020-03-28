import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { defaultOfClasses, defaultOfClass } from '../../../models-one-entity/Classes'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { get_CLASS_PAGE } from '../../../routes'

const MainList = ({
  classes = defaultOfClasses,
  page = 1,
  limit = 10,
}) => {
  const history = useHistory()

  return (
    <div>
      <CustomTable
        headerArray={['#', 'Title', 'Description', 'TutorId', 'Start At', 'End At', 'Menu']}
        data={classes.items}
        renderItemCellsInRow={({ item = defaultOfClass, index = 0 }) => {

          const goToClassDetailPage = () => {
            history.push(get_CLASS_PAGE(item.id))
          }

          return [
            (page - 1) * limit + index + 1,
            item.title,
            item.description,
            item.tutorId,
            item.startAt,
            item.endAt,
            <Button size="sm" onClick={goToClassDetailPage}>
              Detail
            </Button>
          ]
        }}
      />
    </div>
  )
}

export default observer(MainList)
