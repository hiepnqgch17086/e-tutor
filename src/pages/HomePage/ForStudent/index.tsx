import React from 'react'
import { observer } from 'mobx-react-lite'
import CardListOfCounter from './CardListOfCounter'
import TableOfNewestMessages from './TableOfNewestMessages'
import TableOfNextMeetings from './TableOfNextMeetings'
import TableOfNewComments from './TableOfNewComments'

const ForStudent = () => {
  return (
    <div>
      <CardListOfCounter />
      <div className="row">
        <div className="col-lg-6">
          <TableOfNewestMessages />
        </div>
        <div className="col-lg-6">
          <TableOfNextMeetings />
        </div>
      </div>
      <TableOfNewComments />
    </div>
  )
}

export default observer(ForStudent)
