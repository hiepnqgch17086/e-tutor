import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../components-in-managing-resources/CustomTable'
import moment from 'moment'
import AvatarInDefault from '../../images/AvatarInDefault'
import { defaultOfMeeting, defaultOfMeetings } from '../../models-one-entity/Meetings'
import { IS_STUDENT } from '../../models-one-prop/role'
import './TableOfNextMeetings.css'

const TableOfNextMeetings = ({
  nextMeetings = defaultOfMeetings,
  limitMeetingsInLeft = 2
}) => {
  const { role } = nextMeetings

  if (!nextMeetings.items.length) return <></>

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card m-0">
            <div className="card-body p-3">
              <h4 className="card-title">Near Meetings</h4>
            </div>
          </div>
          <CustomTable
            headerArray={[]}
            data={nextMeetings.items.slice(0, limitMeetingsInLeft)}
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
                      {moment(item.startAt).format('h:mm a, DD-MM-YYYY') + " - " + moment(item.endAt).format('h:mm a, DD-MM-YYYY')}
                    </span>
                  </div>
                </div>
              ]
            }}
          />
        </div>

        {
          nextMeetings.items[limitMeetingsInLeft] ? (
            <div className="col-md-6">
              <div className="card m-0">
                <div className="card-body p-3">
                  <h4 className="card-title">Far Meetings</h4>
                </div>
              </div>
              <CustomTable
                headerArray={[]}
                data={nextMeetings.items.slice(limitMeetingsInLeft)}
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
                          {moment(item.startAt).format('h:mm a, DD-MM-YYYY') + " - " + moment(item.endAt).format('h:mm a, DD-MM-YYYY')}
                        </span>
                      </div>
                    </div>
                  ]
                }}
              />
            </div>
          ) : null
        }


      </div>


      {/* <CustomTable
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
                  {moment(item.startAt).format('h:mm a, DD-MM-YYYY') + " - " + moment(item.endAt).format('h:mm a, DD-MM-YYYY')}
                </span>
              </div>
            </div>
          ]
        }}
      /> */}
    </>
  )
}

export default observer(TableOfNextMeetings)
