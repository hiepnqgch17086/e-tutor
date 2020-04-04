import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { HOME_PAGE, CHAT_ROOM_TUTOR_PAGE, MEETING_LIST_PAGE, STUDENT_LIST_PAGE, TUTOR_LIST_PAGE, CHAT_ROOM_STUDENT_PAGE } from '../../routes'
// import ProfilePageData from '../../pages/ProfilePage/data'
import { observer } from 'mobx-react-lite'
import ProfilePageData from '../../pages/ProfilePage/data'
import { IS_ADMIN, IS_TUTOR, IS_STUDENT } from '../../models-one-prop/role'

const SideBar = () => {
  const location = useLocation()
  const pathName = location.pathname
  const { currentUser } = ProfilePageData

  const isDashboardActive = pathName === HOME_PAGE

  const temp = [CHAT_ROOM_TUTOR_PAGE, CHAT_ROOM_STUDENT_PAGE]
  const isChatActive = temp.indexOf(pathName) >= 0

  const isMeetingActive = pathName.indexOf(MEETING_LIST_PAGE) >= 0

  // const userRoutes = [USER_LIST_PAGE, USER_ADD_PAGE]
  const isStudentsTabActive = pathName.indexOf(STUDENT_LIST_PAGE) >= 0
  const isTutorsTabActive = pathName.indexOf(TUTOR_LIST_PAGE) >= 0

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

            {
              currentUser.role === IS_TUTOR && (
                <SideBarItem
                  href={CHAT_ROOM_TUTOR_PAGE}
                  iconName="icon-speech"
                  title="Chat"
                  isActive={isChatActive}
                />
              )
            }

            {
              currentUser.role === IS_STUDENT && (
                <SideBarItem
                  href={CHAT_ROOM_STUDENT_PAGE}
                  iconName="icon-speech"
                  title="Chat"
                  isActive={isChatActive}
                />
              )
            }


            <SideBarItem
              href={MEETING_LIST_PAGE}
              iconName="icon-calender"
              title="Meetings"
              isActive={isMeetingActive}
            />

            {
              currentUser.role === IS_ADMIN && ( // for only admin
                <SideBarItem
                  href={STUDENT_LIST_PAGE}
                  iconName="icon-people"
                  title="Students"
                  isActive={isStudentsTabActive}
                />
              )
            }

            {
              currentUser.role === IS_ADMIN && ( // for only admin
                <SideBarItem
                  href={TUTOR_LIST_PAGE}
                  iconName="icon-people"
                  title="Tutors"
                  isActive={isTutorsTabActive}
                />
              )
            }


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
