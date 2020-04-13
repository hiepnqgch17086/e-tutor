import React from 'react'
import CustomTable from '../../components-in-managing-resources/CustomTable'
import Meetings, { defaultOfMeeting } from '../../models-one-entity/Meetings'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'
import { goMeetingPage } from '../../routes'

const TableOfMeetingByPagination = ({
  meetings = Meetings.create({})
}) => {
  return (
    <CustomTable
      headerArray={['Title', 'Start At', 'End At', 'Menu']}
      className="mb-2"
      data={meetings.items}
      renderItemCellsInRow={({ item = defaultOfMeeting, index = 0 }) => {
        return [
          item.title,
          moment(item.startAt).format('h:mm a, DD-MM-YYYY'),
          moment(item.endAt).format('h:mm a, DD-MM-YYYY'),
          <>
            {
              item.isFutureMeeting ? null : (
                <Button onClick={() => goMeetingPage(item.id)} size="sm">
                  Detail
                </Button>
              )
            }
          </>
        ]
      }}
    />
  )
}

export default observer(TableOfMeetingByPagination)
