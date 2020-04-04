import React from 'react'
import { observer } from 'mobx-react-lite'
import AvatarInDefault from '../../../images/AvatarInDefault'
import { defaultOfMessage } from '../../../models-one-entity/Messages'
import ChatRoomStudentPage from '../data'
import ProfilePageData from '../../ProfilePage/data'

const ListItemOfMessage = ({
  item = defaultOfMessage
}) => {

  const { room: { studentId: { tutorId } } } = ChatRoomStudentPage
  const { currentUser } = ProfilePageData

  const ForTutor = ({ message = defaultOfMessage }) => (
    <li className="chat-item list-style-none mt-3">
      <div className="chat-img d-inline-block">
        <img src={tutorId?.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={45} />
      </div>
      <div className="chat-content d-inline-block pl-3">
        <h6 className="font-weight-medium">{tutorId?.name}</h6>
        <div className="msg p-2 d-inline-block mb-1">{message.text}</div>
      </div>
      {/* <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">10:57 am
  </div> */}
    </li>
  )

  const ForAuth = ({ message = defaultOfMessage }) => (
    <li className="chat-item odd list-style-none mt-3">
      <div className="chat-content text-right d-inline-block pl-3">
        <div className="box msg p-2 d-inline-block mb-1 box">
          {message.text}
        </div>
        <br />
      </div>
      {/* <div className="chat-time text-right d-block font-10 mt-1 mr-0 mb-3">
        10:59 am</div> */}
    </li>
  )

  return (
    <>
      {item.userId.id === currentUser.id ? <ForAuth message={item} /> : null}
      {item.userId.id === tutorId?.id ? <ForTutor message={item} /> : null}
    </>
  )
}

export default observer(ListItemOfMessage)

//form : Auth time
{/* <li className="chat-item odd list-style-none mt-3">
          <div className="chat-content text-right d-inline-block pl-3">
            <div className="box msg p-2 d-inline-block mb-1 box">
              Whats budget
                of the new project.</div>
            <br />
          </div>
          <div className="chat-time text-right d-block font-10 mt-1 mr-0 mb-3">
            10:59 am</div>
        </li> */}


//Form: Auth without time
{/* <li className="chat-item odd list-style-none mt-3">
  <div className="chat-content text-right d-inline-block pl-3">
    <div className="box msg p-2 d-inline-block mb-1">I
    would love to
              join the team.</div>
    <br />
  </div>
</li> */}

//Form : Tutor with time
{/* <li className="chat-item list-style-none mt-3">
  <div className="chat-img d-inline-block"><img src="/assets/images/users/3.jpg" alt="user" className="rounded-circle" width={45} />
  </div>
  <div className="chat-content d-inline-block pl-3">
    <h6 className="font-weight-medium">Angelina Rhodes</h6>
    <div className="msg p-2 d-inline-block mb-1">Well we
    have good budget
    for the project
              </div>
  </div>
  <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">11:00 am
            </div>
</li> */}

// FORM: tutor without time
