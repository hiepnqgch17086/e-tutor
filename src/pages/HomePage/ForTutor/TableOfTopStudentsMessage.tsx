import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import moment from 'moment'
import AvatarInDefault from '../../../images/AvatarInDefault'

const TableOfNextMeetings = () => {
  const defaultItem = {
    id: 1,
    avatar: '',
    name: 'Student 1',
    title: 'Title1',
    startAt: moment().format(),
    endAt: moment().format(),
    number: 20,
  }

  const defaultItem2 = {
    id: 1,
    avatar: '',
    name: 'Student 2',
    title: 'Title2',
    startAt: moment().format(),
    endAt: moment().format(),
    number: 20,
  }

  const defaultData = [defaultItem, defaultItem2]

  return (
    <>
      <div className="card m-0">
        <div className="card-body p-3">
          <h4 className="card-title">Top Students Message</h4>
        </div>
      </div>
      <CustomTable
        headerArray={[]}
        data={defaultData}
        renderItemCellsInRow={({ item = defaultItem }) => {
          return [
            <div className="message-item d-flex align-items-center">
              <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">{item.name}</h6>

                <span className="font-12 text-nowrap d-block text-muted">Number of messages: {item.number}</span>

              </div>
            </div>
          ]
        }}
      />
    </>
  )
}

export default observer(TableOfNextMeetings)
