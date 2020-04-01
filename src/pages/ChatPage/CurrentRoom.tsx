import React from 'react'
import { observer } from 'mobx-react-lite'

const CurrentRoom = () => {
  return (
    <div className="chat-box fix-bug-of-list-contact position-relative" style={{ height: 'calc(60vh)' }}>
      {/*chat Row */}
      <ul className="chat-list list-style-none px-3 pt-3">
        {/*chat Row */}
        <li className="chat-item list-style-none mt-3">
          <div className="chat-img d-inline-block"><img src="assets/images/users/1.jpg" alt="user" className="rounded-circle" width={45} />
          </div>
          <div className="chat-content d-inline-block pl-3">
            <h6 className="font-weight-medium">James Anderson</h6>
            <div className="msg p-2 d-inline-block mb-1">Lorem
            Ipsum is simply
            dummy text of the
                    printing &amp; type setting industry.</div>
          </div>
          <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">10:56 am
                </div>
        </li>
        {/*chat Row */}
        <li className="chat-item list-style-none mt-3">
          <div className="chat-img d-inline-block"><img src="assets/images/users/2.jpg" alt="user" className="rounded-circle" width={45} />
          </div>
          <div className="chat-content d-inline-block pl-3">
            <h6 className="font-weight-medium">Bianca Doe</h6>
            <div className="msg p-2 d-inline-block mb-1">It’s
            Great opportunity to
                    work.</div>
          </div>
          <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">10:57 am
                </div>
        </li>
        {/*chat Row */}
        <li className="chat-item odd list-style-none mt-3">
          <div className="chat-content text-right d-inline-block pl-3">
            <div className="box msg p-2 d-inline-block mb-1">I
            would love to
                    join the team.</div>
            <br />
          </div>
        </li>
        {/*chat Row */}
        <li className="chat-item odd list-style-none mt-3">
          <div className="chat-content text-right d-inline-block pl-3">
            <div className="box msg p-2 d-inline-block mb-1 box">
              Whats budget
                    of the new project.</div>
            <br />
          </div>
          <div className="chat-time text-right d-block font-10 mt-1 mr-0 mb-3">
            10:59 am</div>
        </li>
        {/*chat Row */}
        <li className="chat-item list-style-none mt-3">
          <div className="chat-img d-inline-block"><img src="assets/images/users/3.jpg" alt="user" className="rounded-circle" width={45} />
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
        </li>
        {/*chat Row */}
        <li className="chat-item odd list-style-none mt-3">
          <div className="chat-content text-right d-inline-block pl-3">
            <div className="box msg p-2 d-inline-block mb-1">I
            would love to
                    join the team.</div>
            <br />
          </div>
        </li>
        {/*chat Row */}
        <li className="chat-item odd list-style-none mt-3">
          <div className="chat-content text-right d-inline-block pl-3">
            <div className="box msg p-2 d-inline-block mb-1 box">
              Whats budget
                    of the new project.</div>
            <br />
          </div>
          <div className="chat-time text-right d-block font-10 mt-1 mr-0 mb-3">
            10:59 am</div>
        </li>
      </ul>
    </div>

  )
}

export default observer(CurrentRoom)
