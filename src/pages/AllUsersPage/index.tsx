import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'

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
      <div className="card">
        <SearchBar
          getDatabaseItems={getDatabaseItems}
          setGlobalInput={setSearchByEmail}
          placeholder="Enter user's email"
          setPage={setPage}
        />
      </div>

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
