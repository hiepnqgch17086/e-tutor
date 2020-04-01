import React from 'react'
import Footer from './Footer'
// import PageBreadcrumb from './PageBreadcrumb'

const PageWrapper = ({ children = <></> }) => {
  return (
    <>

      <div className="page-wrapper">
        {/* <PageBreadcrumb /> */}
        <div className="container-fluid" style={{ padding: '15px' }}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PageWrapper
