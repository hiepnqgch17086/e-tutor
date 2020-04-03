import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import ListOfStudent from './ListOfStudent'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
import SlCategoryOfUser from './SlCategoryOfUser'
import { STUDENTS } from './definitions'

/**
 * FOR ADMIN ONLY
 */
const AllUsersPage = () => {

  const [category, setCategory] = useState(STUDENTS)
  const { users } = Data
  const { limit, page, setPage, setLimit, emailContains, setEmailContains } = users

  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate(category)
    return () => {
      // cleanup
      // Data.onWillUnMount()
    }
  }, [category, limit, page, emailContains])

  return (
    <>
      <SearchBar
        setPropInput={setEmailContains}
        placeholder="Enter student/tutor email"
      />
      <div className="d-flex">
        <SlNumberOfItems
          limit={limit}
          setLimit={setLimit}
        />
        <SlCategoryOfUser
          category={category}
          setCategory={setCategory}
        />
      </div>
      {
        category === STUDENTS && (
          <ListOfStudent
            users={users}
          />
        )
      }
      <PaginationBar
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default observer(AllUsersPage)
