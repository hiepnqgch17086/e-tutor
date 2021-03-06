import React from 'react'
import Auth from './Auth'
import UnReadEmailList from './UnReadEmailList'
import { Link, useLocation } from 'react-router-dom'
import {
  // LANDING_PAGE, 
  HOME_PAGE, CHAT_ROOM_TUTOR_PAGE, CHAT_ROOM_STUDENT_PAGE, MEETING_LIST_PAGE, STUDENT_LIST_PAGE, TUTOR_LIST_PAGE, EMAIL_LIST_PAGE, SETTINGS_PAGE
} from '../../../routes'

const Header = () => {
  const location = useLocation()
  const pathName = location.pathname

  const isDashboardActive = pathName === HOME_PAGE

  const temp = [CHAT_ROOM_TUTOR_PAGE, CHAT_ROOM_STUDENT_PAGE]
  const isChatActive = temp.indexOf(pathName) >= 0

  const isMeetingActive = pathName.indexOf(MEETING_LIST_PAGE) >= 0

  // const userRoutes = [USER_LIST_PAGE, USER_ADD_PAGE]
  const isStudentsTabActive = pathName.indexOf(STUDENT_LIST_PAGE) >= 0
  const isTutorsTabActive = pathName.indexOf(TUTOR_LIST_PAGE) >= 0

  const isEmailsActive = pathName.indexOf(EMAIL_LIST_PAGE) >= 0
  // const isEmailDetailActive = pathName.indexOf(EMAIL_DETAIL_PAGE) >= 0
  const isSettingsTabActive = pathName.indexOf(SETTINGS_PAGE) >= 0

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          {/* This is for the sidebar toggle which is visible on mobile only */}
          <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="#!"><i className="ti-menu ti-close" /></a>
          {/* ============================================================== */}
          {/* Logo */}
          {/* ============================================================== */}
          <div className="navbar-brand">
            {/* Logo icon */}
            <Link to={HOME_PAGE}>
              <b className="logo-icon">
                {/* Dark Logo icon */}
                <img src="/assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                {/* Light Logo icon */}
                <img src="/assets/images/logo-icon.png" alt="homepage" className="light-logo" />
              </b>
              {/*End Logo icon */}
              {/* Logo text */}
              <span className="logo-text">
                {/* dark Logo text */}
                <h1 style={{ display: 'inline', fontSize: 'x-large', color: 'black' }}><span style={{ fontWeight: 'bold' }}>E</span>Tutor</h1>
                {/* Light Logo text */}
                {/* <img src="assets/images/logo-light-text.png" className="light-logo" alt="homepage" /> */}
              </span>
            </Link>
          </div>
          {/* ============================================================== */}
          {/* End Logo */}
          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* Toggle which is visible on mobile only */}
          {/* ============================================================== */}
          <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="#!" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more" /></a>
        </div>
        {/* ============================================================== */}
        {/* End Logo */}
        {/* ============================================================== */}
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1 mt-3 mt-md-1 ">
            {/* <UnReadEmailList /> */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#!">
                <div className="customize-input">
                  {/* <input className="form-control custom-shadow custom-radius border-0 bg-white" type="search" placeholder="Search" aria-label="Search" /> */}
                  {/* <i className="form-control-icon" data-feather="search" /> */}
                  <h1 className="text-secondary">
                    {isDashboardActive && 'Dashboard'}
                    {isChatActive && 'Chat'}
                    {isMeetingActive && 'Meeting'}
                    {isStudentsTabActive && 'Student'}
                    {isTutorsTabActive && 'Tutor'}
                    {isEmailsActive && 'Email'}
                    {isSettingsTabActive && 'Setting'}
                  </h1>
                </div>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav float-right">
            <UnReadEmailList />
            <Auth />
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
