import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { get_EMAIL_DETAIL_PAGE } from '../../../../routes'
import moment from 'moment'
import { defaultOfEmail } from '../../../../models-one-entity/Emails'

const UnReadEmailItem = ({
  item = defaultOfEmail
}) => {
  return (
    <Link to={get_EMAIL_DETAIL_PAGE(item.id)} className="message-item d-flex align-items-center border-bottom px-3 py-2">
      <div className="btn btn-danger rounded-circle btn-circle">
        <i className="icon-link" />
      </div>
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
