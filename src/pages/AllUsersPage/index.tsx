import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from './SearchBar'
import PaginationBar from './PaginationBar'
import SlNumberOfItems from './SlNumberOfItems'

const AllUsersPage = () => {

  const { users } = Data
  const { limit, setLimit, page, setPage, getDatabaseItems, setSearchByEmail } = users

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
        getDatabaseItems={getDatabaseItems}
        setGlobalInput={setSearchByEmail}
        placeholder="Enter user's email"
        setPage={setPage}
      />

      <SlNumberOfItems
        limit={limit}
        setLimit={setLimit}
      />
      <MainList
        users={users}
        page={page}
        limit={limit}
      // setLimit={setLimit}
      // setPage={setPage}
      />
      <PaginationBar
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default observer(AllUsersPage)
