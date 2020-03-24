import React from 'react'
import { observer } from 'mobx-react-lite'

const Notification = () => {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle pl-md-3 position-relative" href="#" id="bell" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span><i data-feather="bell" className="svg-icon" /></span>
        <span className="badge badge-primary notify-no rounded-circle">5</span>
      </a>
      <div className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
        <ul className="list-style-none">
          <li>
            <div className="message-center notifications position-relative">
              {/* Message */}
              <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <div className="btn btn-danger rounded-circle btn-circle"><i data-feather="airplay" className="text-white" /></div>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Luanch Admin</h6>
                  <span className="font-12 text-nowrap d-block text-muted">Just see
                  the my new
              admin!</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:30 AM</span>
                </div>
              </a>
              {/* Message */}
              <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-success text-white rounded-circle btn-circle"><i data-feather="calendar" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Event today</h6>
                  <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              a reminder that you have event</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:10 AM</span>
                </div>
              </a>
              {/* Message */}
              <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-info rounded-circle btn-circle"><i data-feather="settings" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Settings</h6>
                  <span className="font-12 text-nowrap d-block text-muted text-truncate">You
                  can customize this template
              as you want</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:08 AM</span>
                </div>
              </a>
              {/* Message */}
              <a href="#" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-primary rounded-circle btn-circle"><i data-feather="box" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Pavan kumar</h6> <span className="font-12 text-nowrap d-block text-muted">Just
              see the my admin!</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:02 AM</span>
                </div>
              </a>
            </div>
          </li>
          <li>
            <a className="nav-link pt-3 text-center text-dark" href="#;">
              <strong>Check all notifications</strong>
              <i className="fa fa-angle-right" />
            </a>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default observer(Notification)
