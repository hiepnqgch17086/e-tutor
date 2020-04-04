import React from 'react'
import { observer } from 'mobx-react-lite'

const ListItemOfMessage = () => {
  return (
    <li className="chat-item list-style-none mt-3">
      <div className="chat-img d-inline-block">
        <img src="/assets/images/users/1.jpg" alt="user" className="rounded-circle" width={45} />
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
  )
}

export default observer(ListItemOfMessage)
