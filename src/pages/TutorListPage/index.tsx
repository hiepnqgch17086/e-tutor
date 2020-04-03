import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
/**
 * FOR ADMIN ONLY
 */
const TutorListPage = () => {

  const { users } = Data
  const { limit, page, setPage, setLimit, emailContains, setEmailContains } = users

  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate()
    return () => {
    }
  }, [limit, page, emailContains])

  return (
    <>
      <SearchBar
        setPropInput={setEmailContains}
        placeholder="tutor email"
      />
      <div className="d-flex">
        <SlNumberOfItems
          limit={limit}
          setLimit={setLimit}
        />
      </div>
      <MainList
        users={users}
      />
      <PaginationBar
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default observer(TutorListPage)
