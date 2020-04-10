import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import PageWrapper from './PageWrapper'
import { useLocation } from 'react-router-dom'

const AdminLayout = ({ children = <></>, pathAvoid = ['str'] }) => {
  let location = useLocation();
  // console.log();
  const shouldAvoid = pathAvoid.indexOf(location.pathname) >= 0
  // display: 'none' will not fire up componentDidMount DidUpdate
  return (
    <>
      {shouldAvoid && children}
      <div>
        <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
          data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full" style={shouldAvoid ? { display: 'none' } : {}}>
          <Header />
          <SideBar />
          <PageWrapper>
            {children}
          </PageWrapper>
        </div>
      </div>
    </>

  )
}

export default AdminLayout
