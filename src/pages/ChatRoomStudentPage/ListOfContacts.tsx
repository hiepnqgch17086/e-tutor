import React from 'react'
import { observer } from 'mobx-react-lite'

const ListOfContacts = () => {
  return (
    <div className="position-relative fix-bug-of-list-contact border-top border-right-0" style={{
      height: 'calc(60vh)'
    }}>
      <ul className="mailbox list-style-none">
        <li>
          <div className="message-center">
            {/* Message */}
            <a href="#!" className="btn message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/1.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status online float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1 text-left">Pavan kumar</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate text-left">You: Just see the my new admin!</span>
                <span className="font-12 text-nowrap d-block text-muted text-left">9:30AM</span>
              </div>
            </a>

          </div>
        </li>
      </ul>
    </div>
  )
}

export default observer(ListOfContacts)
