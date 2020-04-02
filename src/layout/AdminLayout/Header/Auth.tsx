import React from 'react'
import ProfilePageData from '../../../pages/ProfilePage/data'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { PROFILE_PAGE, SIGN_IN_PAGE } from '../../../routes'
import AvatarInDefault from '../../../images/AvatarInDefault'

const Auth = () => {
  const { currentUser } = ProfilePageData
  const { avatar, name, } = currentUser

  const onLogout = () => {
    currentUser.setLogout()
    window.location.href = (SIGN_IN_PAGE)
  }
  // const name = 
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#!" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src={avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
        <span className="ml-2 d-none d-lg-inline-block">
          {/* <span>Hello,</span>  */}
          <span className="text-dark">{name}</span> <i data-feather="chevron-down" className="svg-icon" />
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY" style={{ padding: '0px' }}>
        <Link to={PROFILE_PAGE} className="dropdown-item" href="#!" >
          <i data-feather="user" className="svg-icon mr-2 ml-1" />
              My Profile
        </Link>
        {/* <a className="dropdown-item" href="#!" style={{ marginTop: '0.5rem' }}>
          <i data-feather="user" className="svg-icon mr-2 ml-1" />
              My Profile
              </a> */}
        {/* <a className="dropdown-item" href="#!"><i data-feather="credit-card" className="svg-icon mr-2 ml-1" />
              My Balance</a>
        <a className="dropdown-item" href="#!"><i data-feather="mail" className="svg-icon mr-2 ml-1" />
              Inbox</a>
        <div className="dropdown-divider" />
        <a className="dropdown-item" href="#!"><i data-feather="settings" className="svg-icon mr-2 ml-1" />
              Account Setting</a> */}
        <div className="dropdown-divider m-0" />
        <a className="dropdown-item" href="#!" onClick={onLogout}><i data-feather="power" className="svg-icon mr-2 ml-1" />
              Logout</a>
        {/* <div className="dropdown-divider" />
        <div className="pl-4 p-3"><a href="#!" className="btn btn-sm btn-info">View
                Profile</a></div> */}
      </div>

    </li>
  )
}

export default observer(Auth)
