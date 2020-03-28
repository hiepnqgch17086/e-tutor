import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { HOME_PAGE, CLASS_LIST_PAGE, USER_LIST_PAGE, CLASS_ADD_PAGE, getIsUserPagePath, USER_ADD_PAGE, CLASS_DETAIL_PAGE, getIsClassPagePath } from '../../routes'
import ProfilePageData from '../../pages/ProfilePage/data'
import { observer } from 'mobx-react-lite'

const SideBar = () => {
  const location = useLocation()
  const pathName = location.pathname
  const { currentUser } = ProfilePageData

  // console.log(pathName)

  const isDashboardActive = pathName === HOME_PAGE

  const classRoutes = [CLASS_LIST_PAGE, CLASS_ADD_PAGE]
  const isClassesActive = classRoutes.indexOf(pathName) >= 0 || getIsClassPagePath(pathName)

  const userRoutes = [USER_LIST_PAGE, USER_ADD_PAGE]
  const isUsersActive = userRoutes.indexOf(pathName) >= 0 || getIsUserPagePath(pathName)

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
              href={CLASS_LIST_PAGE}
              iconName="icon-puzzle"
              title="Classes"
              isActive={isClassesActive}
            />

            {
              currentUser.isAdmin && (
                <SideBarItem
                  href={USER_LIST_PAGE}
                  iconName="icon-people"
                  title="Users"
                  isActive={isUsersActive}
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
  return <li className={`sidebar-item ${isActive && 'selected'}`}>
    <Link to={href} className={`sidebar-link sidebar-link ${isActive && 'active'}`} aria-expanded="false">
      <i className={iconName} />
      <span className="hide-menu">{title}</span>
    </Link>
  </li>
}

export default observer(SideBar)
