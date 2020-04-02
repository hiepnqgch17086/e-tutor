import React from 'react'
import Footer from './Footer'

const PageWrapper = ({ children = <></> }) => {
  return (
    <>

      <div className="page-wrapper">
        {/* <PageBreadcrumb /> */}
        <div className="container-fluid">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PageWrapper
