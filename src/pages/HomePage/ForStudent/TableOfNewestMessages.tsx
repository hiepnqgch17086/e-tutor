import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import moment from 'moment'
import { Link } from 'react-router-dom'
import AvatarInDefault from '../../../images/AvatarInDefault'

const TableOfNewestMessages = () => {
  const defaultItem = {
    id: 1,
    avatar: '',
    name: 'Tutor1',
    text: 'System node title',
    createdAt: moment().format()
  }

  const defaultData = [defaultItem, defaultItem]

  return (
    <>
      <div className="card m-0">
        <div className="card-body p-3">
          <h4 className="card-title">New Messages Received</h4>
        </div>
      </div>
      <CustomTable
        headerArray={[]}
        data={defaultData}
        renderItemCellsInRow={({ item = defaultItem, index = 0 }) => {
          return [
            <Link to={'/'} className="message-item d-flex align-items-center">
              <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">{item.name}</h6>
                <span className="font-12 text-nowrap d-block text-muted">Message: {item.text}</span>
                <span className="font-12 text-nowrap d-block text-muted">
                  {moment(item.createdAt).calendar()}
                </span>
              </div>
            </Link>
          ]
        }}
      />
    </>
  )
}

export default observer(TableOfNewestMessages)
