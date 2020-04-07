import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import AvatarInDefault from '../../../images/AvatarInDefault'
import Data from './data'
import { defaultOfUser } from '../../../models-one-entity/Users'

const TableOfTopStudentsMessage = () => {
  const { topTenStudentsMessage: users } = Data


  return (
    <>
      <div className="card m-0">
        <div className="card-body p-3">
          <h4 className="card-title">Top 10 Students Message</h4>
        </div>
      </div>
      <CustomTable
        headerArray={[]}
        data={users.items}
        renderItemCellsInRow={({ item = defaultOfUser }) => {
          return [
            <div className="message-item d-flex align-items-center">
              <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">{item.name}</h6>

                <span className="font-12 text-nowrap d-block text-muted">Number of messages: {item.totalOfMessages}</span>

              </div>
            </div>
          ]
        }}
      />
    </>
  )
}

export default observer(TableOfTopStudentsMessage)
