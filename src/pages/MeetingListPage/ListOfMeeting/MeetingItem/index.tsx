import React from 'react'
import { get_MEETING_DETAIL_PAGE } from '../../../../routes'
import moment from 'moment'
import AvatarInDefault from '../../../../images/AvatarInDefault'
import { defaultOfMeeting } from '../../../../models-one-entity/Meetings'
import './MeetingItem.css'
import BtnMenu from './BtnMenu'
import ProfilePageData from '../../../ProfilePage/data'
import { IS_TUTOR } from '../../../../models-one-prop/role'
import { observer } from 'mobx-react-lite'

const MeetingItem = ({ item = defaultOfMeeting }) => {
  // const item = {
  //   title: "Meeting title",
  //   with: "Std/tutor one",
  //   id: 1,
  //   name: 'Name tutor/student',
  //   avatar: '',
  //   startAt: moment().format(),
  //   endAt: moment().format()
  // }
  return (
    <div className="calendar-events mb-2 d-flex border-top" data-class="bg-success"
      style={{ cursor: 'pointer' }}
    >
      <a href={get_MEETING_DETAIL_PAGE(item.id)} className="message-item d-flex align-items-center flex-grow-1" target="_blank" rel="noopener noreferrer">
        <div className="d-flex align-items-center mr-auto">
          <img src={item.studentId.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
          <div className="w-75 d-inline-block v-middle pl-2">
            <h6 className="message-title mb-0 mt-1">{item.studentId.name}</h6>
            <span className="font-12 text-nowrap d-block text-dark">Title: {item.title}</span>
            <span className="font-12 text-nowrap d-block text-muted">
              {'Start At: ' + moment(item.startAt).calendar()}
            </span>
            <span className="font-12 text-nowrap d-block text-muted">
              {'End At: ' + moment(item.endAt).calendar()}
            </span>
          </div>
        </div>
      </a>
      {
        ProfilePageData.currentUser.role === IS_TUTOR &&
        <BtnMenu meeting={item} />
      }
    </div>
  )
}

export default observer(MeetingItem)
