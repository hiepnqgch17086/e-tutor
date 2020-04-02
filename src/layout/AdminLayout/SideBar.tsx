import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { HOME_PAGE, CHAT_PAGE, MEETING_LIST_PAGE } from '../../routes'
// import ProfilePageData from '../../pages/ProfilePage/data'
import { observer } from 'mobx-react-lite'

const SideBar = () => {
  const location = useLocation()
  const pathName = location.pathname

  const isDashboardActive = pathName === HOME_PAGE

  const isChatActive = pathName === CHAT_PAGE

  const isMeetingActive = pathName.indexOf(MEETING_LIST_PAGE) >= 0

  // const userRoutes = [USER_LIST_PAGE, USER_ADD_PAGE]
  // const isUsersActive = userRoutes.indexOf(pathName) >= 0 || getIsUserPagePath(pathName)

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      {/* Sidebar scroll*/}
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav">
          <ul id="sidebarnav">

            <SideBarItem
              href={HOME_PAGE}
              iconName="icon-home"
              title="Dashboard"
              isActive={isDashboardActive}
            />

            <li className="list-divider" />
            <li className="nav-small-cap"><span className="hide-menu">Applications</span></li>

            <SideBarItem
              href={CHAT_PAGE}
              iconName="icon-speech"
              title="Chat"
              isActive={isChatActive}
            />

            <SideBarItem
              href={MEETING_LIST_PAGE}
              iconName="icon-calender"
              title="Meetings"
              isActive={isMeetingActive}
            />
          </ul>
        </nav>
        {/* End Sidebar navigation */}
      </div>
      {/* End Sidebar scroll*/}
    </aside>

  )
}

const SideBarItem = ({ isActive = false, iconName = '', title = '', href = "" }) => {
  return <li className={`sidebar-item ${isActive ? 'selected' : ''}`}>
    <Link to={href} className={`sidebar-link ${isActive ? 'active' : ''}`} aria-expanded="false">
      <i className={iconName} />
      <span className="hide-menu">{title}</span>
    </Link>
  </li>
}

export default observer(SideBar)
