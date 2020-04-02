import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { get_EMAIL_DETAIL_PAGE } from '../../../../routes'
import moment from 'moment'

const UnReadEmailItem = ({
  item = {
    id: 1,
    title: 'Assign tutor',
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptatem natus sit aliquid? Adipisci eius harum nemo ut, quidem a itaque, necessitatibus, autem possimus culpa quos quaerat amet eaque in?",
    createdAt: moment().format()
  }
}) => {
  return (
    <Link to={get_EMAIL_DETAIL_PAGE(item.id)} className="message-item d-flex align-items-center border-bottom px-3 py-2">
      <div className="btn btn-danger rounded-circle btn-circle"><i data-feather="airplay" className="text-white" /></div>
      <div className="w-75 d-inline-block v-middle pl-2">
        <h6 className="message-title mb-0 mt-1">{item.title}</h6>
        <span className="font-12 text-nowrap d-block text-muted">{item.body.replace(/^(.{50}[^\s]*).*/, "$1") + '...'}</span>
        <span className="font-12 text-nowrap d-block text-muted">
          {moment(item.createdAt).calendar()}
        </span>
      </div>
    </Link>
  )
}

export default observer(UnReadEmailItem)
