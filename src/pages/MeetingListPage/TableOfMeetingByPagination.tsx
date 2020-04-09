import React from 'react'
import CustomTable from '../../components-in-managing-resources/CustomTable'
import Meetings, { defaultOfMeeting } from '../../models-one-entity/Meetings'
import moment from 'moment'
import { observer } from 'mobx-react-lite'

const TableOfMeetingByPagination = ({
  meetings = Meetings.create({})
}) => {
  return (
    <CustomTable
      headerArray={['Title', 'Start At', 'End At']}
      className="mb-2"
      data={meetings.items}
      renderItemCellsInRow={({ item = defaultOfMeeting, index = 0 }) => {
        return [
          item.title,
          moment(item.startAt).format('h:mm a, DD-MM-YYYY'),
          moment(item.endAt).format('h:mm a, DD-MM-YYYY'),
        ]
      }}
    />
  )
}

export default observer(TableOfMeetingByPagination)
