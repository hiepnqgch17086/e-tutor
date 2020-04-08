import React from 'react'
import { observer } from 'mobx-react-lite'
import CardsCounterOfMessagesMeetingsComments from '../../../components/Dashboard/CardsCounterOfMessagesMeetingsComments'
import TableOfNewestMessages from '../../../components/Dashboard/TableOfNewestMessages'
import TableOfNewestComments from '../../../components/Dashboard/TableOfNewestComments'
import TableOfNextMeetings from '../../../components/Dashboard/TableOfNextMeetings'

const ForStudent = () => {
  return (
    <div>
      <CardsCounterOfMessagesMeetingsComments />
      <div className="row">
        <div className="col-lg-6">
          <TableOfNewestMessages />
        </div>
        <div className="col-lg-6">
          <TableOfNextMeetings />
        </div>
      </div>
      <TableOfNewestComments />
    </div>
  )
}

export default observer(ForStudent)
