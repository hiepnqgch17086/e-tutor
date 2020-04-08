import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import moment from 'moment'
import { Link } from 'react-router-dom'
import AvatarInDefault from '../../../images/AvatarInDefault'
import { get_MEETING_DETAIL_PAGE } from '../../../routes'
import Data from './data'
import { defaultOfMeeting } from '../../../models-one-entity/Meetings'
import { IS_STUDENT } from '../../../models-one-prop/role'

const TableOfNextMeetings = () => {
  const { nextMeetings } = Data
  const { role } = nextMeetings


  return (
    <>
      <div className="card m-0">
        <div className="card-body p-3">
          <h4 className="card-title">Next Meetings</h4>
        </div>
      </div>
      <CustomTable
        headerArray={[]}
        data={nextMeetings.items}
        renderItemCellsInRow={({ item = defaultOfMeeting, index = 0 }) => {
          const auth = role !== IS_STUDENT
            ? item.studentId
            : item.creatorId
          return [
            <div className="message-item d-flex align-items-center">
              <img src={auth.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">{auth.name}</h6>
                <span className="font-12 text-nowrap d-block text-muted">Meeting's title: {item.title}</span>
                <span className="font-12 text-nowrap d-block text-muted">
                  {moment(item.startAt).calendar() + " - " + moment(item.endAt).format('LT')}
                </span>
              </div>
            </div>
          ]
        }}
      />
    </>
  )
}

export default observer(TableOfNextMeetings)
