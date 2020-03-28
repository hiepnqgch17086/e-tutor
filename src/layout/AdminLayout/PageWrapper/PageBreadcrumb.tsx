import React from 'react'
import { observer } from 'mobx-react-lite'
import ProfilePageData from '../../../pages/ProfilePage/data'
import { Link, useLocation } from 'react-router-dom'
import { HOME_PAGE, CLASS_LIST_PAGE, PROFILE_PAGE, PROFILE_EDIT_PAGE, ALL_USERS_PAGE, CLASS_ADD_PAGE, getIsUserPagePath } from '../../../routes'
import moment from 'moment'

const PageBreadcrumb = () => {

  const location = useLocation()
  const pathName = location.pathname

  const { title, breadcrumb } = _getDisplay(pathName)

  return (
    <div className="page-breadcrumb">
      <div className="row">
        <div className="col-7 align-self-center">
          <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
            {title}
          </h4>


          <div className="d-flex align-items-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb m-0 p-0">
                {breadcrumb}
              </ol>
            </nav>
          </div>


        </div>
        <div className="col-5 align-self-center">
          <div className="float-right">
            <span className="custom-select-set form-control bg-white border-0 custom-shadow custom-radius" style={{ paddingRight: "30px" }}>{moment().format("MMM D")}</span>
            {/* <select className="custom-select custom-select-set form-control bg-white border-0 custom-shadow custom-radius" defaultValue="">
              <option value="">Aug 19</option>
              <option value={1}>July 19</option>
              <option value={2}>Jun 19</option>
            </select> */}
          </div>
        </div>
      </div>
    </div>

  )
}

const _getDisplay = (pathName: string) => {
  const { currentUser } = ProfilePageData

  const classBreadcrumbRoot = (
    <>
      <li className="breadcrumb-item">
        <Link to={HOME_PAGE}>Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={CLASS_LIST_PAGE}>Classes</Link>
      </li>
    </>
  )

  const profileBreadcrumbRoot = (
    <>
      <li className="breadcrumb-item">
        <Link to={HOME_PAGE}>Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={PROFILE_PAGE}>My Profile</Link>
      </li>
    </>
  )



  if (getIsUserPagePath(pathName)) {
    return {
      title: `User detail`,
      breadcrumb: (
        <>
          <li className="breadcrumb-item">
            <Link to={HOME_PAGE}>Home</Link>
          </li>
        </>
      )
    }
  }

  // case USER_PAGE:

  switch (pathName) {
    case HOME_PAGE:
      return {
        title: `Hello ${currentUser.name}!`,
        breadcrumb: (
          <li className="breadcrumb-item">
            <Link to={HOME_PAGE}>Dashboard</Link>
          </li>
        )
      };
    case PROFILE_PAGE:
      return {
        title: `My Profile`,
        breadcrumb: profileBreadcrumbRoot
      };
    case PROFILE_EDIT_PAGE:
      return {
        title: `Edit Profile`,
        breadcrumb: (
          <>
            {profileBreadcrumbRoot}
            <li className="breadcrumb-item">
              <Link to={PROFILE_EDIT_PAGE}>Edit</Link>
            </li>
          </>
        )
      };
    case CLASS_LIST_PAGE:
      return {
        title: `Classes`,
        breadcrumb: classBreadcrumbRoot
      }
    case CLASS_ADD_PAGE:
      return {
        title: `Add Class`,
        breadcrumb: (
          <>
            {classBreadcrumbRoot}
            <li className="breadcrumb-item">
              <Link to={CLASS_ADD_PAGE}>Add Class</Link>
            </li>
          </>
        )
      }
    case ALL_USERS_PAGE:
      return {
        title: `Users`,
        breadcrumb: (
          <>
            <li className="breadcrumb-item">
              <Link to={HOME_PAGE}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={ALL_USERS_PAGE}>Users</Link>
            </li>
          </>
        )
      }

    default:
      return {
        title: '',
        Breadcrumb: <></>
      };;
  }
}

export default observer(PageBreadcrumb)
