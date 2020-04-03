import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
import SlCategoryOfUser from './SlCategoryOfUser'

/**
 * FOR ADMIN ONLY
 */
const AllUsersPage = () => {

  useEffect(() => {
    // effect
    Data.onDidMount()
    return () => {
      // cleanup
      Data.onWillUnMount()
    }
  }, [])

  return (
    <>
      <SearchBar
        getDatabaseItems={() => { }}
        placeholder="Enter student/tutor email"
      />
      <div className="d-flex">
        <SlNumberOfItems />
        <SlCategoryOfUser />
      </div>
      <MainList
      // users={users}
      // page={page}
      // limit={limit}
      // setLimit={setLimit}
      // setPage={setPage}
      />
      <PaginationBar
      // page={page}
      // setPage={setPage}
      />
    </>
  )
}

export default observer(AllUsersPage)
