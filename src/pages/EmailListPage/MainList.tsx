import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../components-in-managing-resources/CustomTable'
import moment from 'moment'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { get_EMAIL_DETAIL_PAGE } from '../../routes'

const MainList = () => {

  const defaultItem = {
    id: 1,
    title: 'System node title',
    body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo repellat, impedit asperiores id natus, autem quam quibusdam, odit consequuntur nam recusandae sunt enim sit voluptatum temporibus cumque! Dolorem, eius cum!',
    createdAt: moment().format()
  }

  const defaultData = [defaultItem]

  return (
    <CustomTable
      headerArray={['Menu', 'Title', 'Body', 'CreatedAt',]}
      data={defaultData}
      renderItemCellsInRow={({ item = defaultItem, index = 0 }) => {
        return [
          <Link to={get_EMAIL_DETAIL_PAGE(item.id)}>
            <Button size="sm">Detail</Button>
          </Link>,
          item.title,
          <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {item.body.replace(/^(.{50}[^\s]*).*/, "$1") + '...'}
          </div>,
          moment(item.createdAt).calendar(),
        ]
      }}
    />
  )
}

export default observer(MainList)
