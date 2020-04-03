import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { EMAIL_LIST_PAGE } from '../../../../routes'
import UnReadEmailItem from './UnReadEmailItem'
import ProfilePageData from '../../../../pages/ProfilePage/data'
import { unReadEmailOfAuth } from './data'

const UnReadEmailList = () => {

  const { currentUser } = ProfilePageData

  useEffect(() => {
    // effect
    if (!currentUser.id) return

    unReadEmailOfAuth.getDatabaseUnReadEmailsOfAuth()
    return () => {
      // cleanup
    }
  }, [currentUser.id])

  return (
    <li className="nav-item dropdown">
      <a href="#!" className="nav-link dropdown-toggle pl-md-3 position-relative" id="bell" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span><i data-feather="mail" className="svg-icon" /></span>
        <span className="badge badge-primary notify-no rounded-circle">
          {unReadEmailOfAuth.countOfUnReadEmails}
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
        <ul className="list-style-none">
          <li>
            <div className="message-center notifications position-relative">
              {/* Message */}
              {
                unReadEmailOfAuth.items.map((item) => (
                  <UnReadEmailItem key={item.id} item={item} />
                ))
              }


              {/* <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-success text-white rounded-circle btn-circle"><i data-feather="calendar" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Event today</h6>
                  <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              a reminder that you have event</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:10 AM</span>
                </div>
              </a>


              <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-info rounded-circle btn-circle"><i data-feather="settings" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Settings</h6>
                  <span className="font-12 text-nowrap d-block text-muted text-truncate">You
                  can customize this template
              as you want</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:08 AM</span>
                </div>
              </a>


              <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-primary rounded-circle btn-circle"><i data-feather="box" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Pavan kumar</h6> <span className="font-12 text-nowrap d-block text-muted">Just
              see the my admin!</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:02 AM</span>
                </div>
              </a> */}

            </div>
          </li>
          <li>
            <Link to={EMAIL_LIST_PAGE} className="nav-link pt-3 text-center text-dark">
              <strong>Check all notifications</strong>
              <i className="fa fa-angle-right" />
            </Link>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default observer(UnReadEmailList)
