import React from 'react'
import { observer } from 'mobx-react-lite'

const ListOfContacts = () => {
  return (
    <div className="position-relative fix-bug-of-list-contact " style={{
      height: 'calc(60vh)'
    }}>
      <ul className="mailbox list-style-none">
        <li>
          <div className="message-center">
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/1.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status online float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Pavan kumar</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
                see
                the my new
              admin!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:30
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/2.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status busy float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Sonu Nigam</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">I've
                sung a
              song! See you at</span>
                <span className="font-12 text-nowrap d-block text-muted">9:10
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"> <img src="assets/images/users/3.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status away float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Arijit Sinh</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">I
                am a
              singer!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:08
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/4.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status offline float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Nirav Joshi</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              see the my admin!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:02
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/5.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status offline float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Sunil Joshi</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              see the my admin!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:02
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/6.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status offline float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Akshay Kumar</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              see the my admin!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:02
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
              <div className="user-img"><img src="assets/images/users/7.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status offline float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Pavan kumar</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              see the my admin!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:02
              AM</span>
              </div>
            </a>
            {/* Message */}
            <a href="#" className="message-item d-flex align-items-center px-3 py-2">
              <div className="user-img"><img src="assets/images/users/8.jpg" alt="user" className="img-fluid rounded-circle" width="40px" /> <span className="profile-status offline float-right" />
              </div>
              <div className="w-75 d-inline-block v-middle pl-2">
                <h6 className="message-title mb-0 mt-1">Varun Dhavan</h6>
                <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              see the my admin!</span>
                <span className="font-12 text-nowrap d-block text-muted">9:02
              AM</span>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default observer(ListOfContacts)
